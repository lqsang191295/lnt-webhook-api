import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { HelperService } from '../../modules/helper/helper.service';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorators/public.decorator';
import { Response } from 'express';
import { ApiResponse } from '../../common/api/api-response';
import { AD_UserLoggedService } from '../AD_UserLogged/AD_UserLogged.service';
import { PushNotificationService } from '../push-notification/push-notification.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly helperService: HelperService,
    private readonly authService: AuthService,
    private readonly ad_UserLoggedService: AD_UserLoggedService,
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @Public()
  @Get('pkce')
  generatePKCE() {
    const codeVerifier = this.helperService.generateCodeVerifier();
    const codeChallenge =
      this.helperService.generateCodeChallenge(codeVerifier);

    return ApiResponse.success('Handle pkce success!', {
      code_verifier: codeVerifier,
      code_challenge: codeChallenge,
      method: 'S256', // OAuth PKCE uses 'S256' method
    });
  }

  @Public()
  @Post('sign-in')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('deviceToken') deviceToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const jwt = await this.authService.signIn(username, password);

      response.cookie('authToken', jwt, {
        httpOnly: false, // 🔐 Bảo vệ cookie, ngăn JavaScript truy cập
        secure: process.env.NODE_ENV === 'production', // 🔒 Chỉ gửi cookie qua HTTPS nếu ở production
        sameSite: 'lax', // 🛡️ Ngăn CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // ⏳ 7 ngày (tính bằng milliseconds)
      });

      // Check main devices
      const adUserLogged = await this.ad_UserLoggedService.findById([
        { UserID: username },
      ]);

      // K co main device thi login
      if (!adUserLogged || !adUserLogged.length) {
        return ApiResponse.success('Handle JWT success!', {
          jwt,
        });
      }

      const isMainDevice = adUserLogged.find((item) => {
        return item.IsMainDevice;
      });

      if (!isMainDevice) {
        return ApiResponse.success('Handle JWT success!', {
          jwt,
        });
      }

      console.log('adUserLogged === ', adUserLogged, deviceToken);

      const isDeviceAccepted = adUserLogged.find(
        (item) =>
          item.TokenDevice === deviceToken &&
          (item.Accepted || item.IsMainDevice),
      );

      if (isDeviceAccepted) {
        return ApiResponse.success('Handle JWT success!', {
          jwt,
        });
      }

      // Send push notification cho main device
      await this.pushNotificationService.sendPushNotification(
        {
          mainDeviceToken: isMainDevice.TokenDevice,
          deviceToken,
          username,
          jwt,
        },
        'Yêu cầu đăng nhập',
        'Một thiết bị mới đang yêu cầu truy cập tài khoản',
      );

      return ApiResponse.success('Handle JWT success!', {
        jwt,
        waitAcceptDevice: true,
      });
    } catch (error) {
      console.log('errorr', error);
      return ApiResponse.error('Handle JWT failed!', 500, error.message);
    }
  }

  @Post('log-out')
  async logOut(@Res({ passthrough: true }) response: Response) {
    try {
      response.clearCookie('authToken', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return ApiResponse.success('Logout successful!');
    } catch (error) {
      return ApiResponse.error('Logout failed!', 500, error.message);
    }
  }

  @Public()
  @Post('sign-in-with-code')
  signInWithCode(
    @Body('code') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.signIn(username, password);
  }

  @Public()
  @Post('approve-device')
  async approveDevice(
    @Body('username') username: string,
    @Body('token') token: string,
    @Body('deviceToken') deviceToken: string,
  ) {
    try {
      if (!this.authService.validateToken(token)) {
        return ApiResponse.error(
          'Approve device failed!',
          500,
          'Invalid token',
        );
      }

      await this.ad_UserLoggedService.update(
        { UserID: username, TokenDevice: deviceToken },
        {
          Accepted: true,
        },
      );

      return ApiResponse.success('Approve device successful!');
    } catch (error) {
      console.log('error === ', error);
      return ApiResponse.error('Approve device failed!', 500, error.message);
    }
  }

  // Post token qua sendPushNotification -> sau đó user click vào accept device -> check jwt -> giải mã -> check user - password
  @Public()
  @Post('reject-device')
  async rejectDevice(
    @Body('username') username: string,
    @Body('token') token: string,
    @Body('deviceToken') deviceToken: string,
  ) {
    try {
      if (!this.authService.validateToken(token)) {
        return ApiResponse.error(
          'Approve device failed!',
          500,
          'Invalid token',
        );
      }

      await this.ad_UserLoggedService.update(
        { UserID: username, TokenDevice: deviceToken },
        {
          Accepted: false,
        },
      );

      return ApiResponse.success('Approve device successful!');
    } catch (error) {
      console.log('error === ', error);
      return ApiResponse.error('Approve device failed!', 500, error.message);
    }
  }
}
