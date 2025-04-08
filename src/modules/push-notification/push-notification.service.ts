import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { google } from 'googleapis';
import * as path from 'path'; // Import path module

const SERVICE_ACCOUNT_KEY_PATH = path.resolve(
  __dirname,
  '../../config/lnt-push-notification-firebase-adminsdk-fbsvc-492f1350d4.json',
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

  async sendPushNotification(
    data: {
      mainDeviceToken: string;
      deviceToken: string;
      username: string;
      jwt: string;
    },
    title: string,
    body: string,
  ) {
    const accessToken = await this.getAccessToken();

    return await axios.post(
      'https://fcm.googleapis.com/v1/projects/lnt-push-notification/messages:send',
      {
        message: {
          token: data.mainDeviceToken, // Chắc chắn rằng deviceToken là token hợp lệ
          notification: {
            title,
            body,
          },
          data: {
            click_action: `http://localhost:3000/access-device?token=${data.jwt}&username=${data.username}&deviceToken=${data.deviceToken}`,
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
