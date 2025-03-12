import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebhookService {
  private readonly appId = process.env.ZALO_APP_ID;
  private readonly appSecret = process.env.ZALO_SECRET_KEY;

  async getAccessToken(authCode: string) {
    const url = 'https://oauth.zaloapp.com/v4/oa/access_token';

    const data = {
      app_id: this.appId,
      secret_key: this.appSecret,
      code: authCode,
      grant_type: 'authorization_code',
    };

    console.log('data ------ ', data);

    try {
      const response = await axios.post(url, data);
      console.log('response.data === ', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Error getting access token:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const url = 'https://oauth.zaloapp.com/v4/oa/access_token';

    const data = {
      app_id: this.appId,
      secret_key: this.appSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };

    console.log('data ', data);

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error(
        'Error refreshing access token:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
