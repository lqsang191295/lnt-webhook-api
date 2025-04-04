import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { google } from 'googleapis';
import * as path from 'path'; // Import path module

const SERVICE_ACCOUNT_KEY_PATH = path.resolve(
  __dirname,
  '../../config/lnt-push-notification-firebase-adminsdk-fbsvc-72cded296b.json',
);

const SCOPES = ['https://www.googleapis.com/auth/firebase.messaging'];

@Injectable()
export class PushNotificationService {
  constructor() {}

  async getAccessToken() {
    return new Promise(function (resolve, reject) {
      const key = require(SERVICE_ACCOUNT_KEY_PATH); // Đọc file JSON service account
      const jwtClient = new google.auth.JWT(
        key.client_email,
        undefined,
        key.private_key,
        SCOPES,
        undefined,
      );

      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
          return;
        }

        resolve(tokens?.access_token); // Trả về access token
      });
    });
  }

  async sendPushNotification(deviceToken: any, title: string, body: string) {
    const accessToken = await this.getAccessToken();
    console.log('accessToken === ', accessToken, {
      to: deviceToken,
      notification: {
        title,
        body,
      },
    });

    return await axios.post(
      'https://fcm.googleapis.com/v1/projects/lnt-push-notification/messages:send',
      {
        message: {
          token: deviceToken, // Chắc chắn rằng deviceToken là token hợp lệ
          notification: {
            title: 'Yêu cầu đăng nhập',
            body: 'Một thiết bị mới đang yêu cầu truy cập tài khoản',
          },
          data: {
            click_action: 'http://webhook.bvlengoctung.com:3004/',
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      },
    );
  }
}
