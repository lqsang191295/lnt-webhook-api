import { Body, Controller, Post } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import axios from 'axios';
import { ApiResponse } from 'src/common/api/api-response';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('push-notification')
export class PushNotificationController {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  private deviceToken: string = ''; // Giả lập database lưu subscriptions

  @Public()
  @Post('subscribe')
  async subscribe(@Body('token') token: string) {
    try {
      console.log('New subscription received:', token);
      this.deviceToken = token;
      return ApiResponse.success('Subscribe token success!', { token });
    } catch (error) {
      console.log('sendNotification ex === ', error);
      return ApiResponse.error('Subscribe token failed!', 500, error.message);
    }
  }

  @Public()
  @Post('send')
  async sendNotification() {
    try {
      console.log('this.deviceToken === ', this.deviceToken);
      const result = await this.pushNotificationService.sendPushNotification(
        this.deviceToken,
        'Yêu cầu đăng nhập',
        'Một thiết bị mới đang yêu cầu truy cập tài khoản',
      );

      return ApiResponse.success('Send notification success!', { result });
    } catch (ex) {
      console.log('sendNotification ex === ', ex.message);
      return ApiResponse.error('Send notification failed!', 500, ex.message);
    }
  }
}
