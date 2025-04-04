import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { HelperService } from '../../modules/helper/helper.service';
import { AuthService } from './auth.service';
import { Public } from '../../common/decorators/public.decorator';
import { Response } from 'express';
import { ApiResponse } from '../../common/api/api-response';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly helperService: HelperService,
    private readonly authService: AuthService,
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
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const jwt = await this.authService.signIn(username, password);

      response.cookie('authToken', jwt, {
        httpOnly: false, // 🔐 Bảo vệ cookie, ngăn JavaScript truy cập
        secure: process.env.NODE_ENV === 'production', // 🔒 Chỉ gửi cookie qua HTTPS nếu ở production
        sameSite: 'strict', // 🛡️ Ngăn CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // ⏳ 7 ngày (tính bằng milliseconds)
      });

      return ApiResponse.success('Handle JWT success!', {
        jwt,
      });
    } catch (error) {
      return ApiResponse.error('Handle JWT failed!', 500, error.message);
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
}
