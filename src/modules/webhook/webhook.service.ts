import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { TypeResponseZalo, TypeResponseZaloError } from 'src/common/types/zalo';

@Injectable()
export class WebhookService {
  private zaloAppId;
  private zaloAppSecret;
  private zaloUrlOauth;

  constructor(private configService: ConfigService) {
    this.zaloAppId = this.configService.get<string>('ZALO_APP_ID') || '';
    this.zaloAppSecret =
      this.configService.get<string>('ZALO_SECRET_KEY') || '';
    this.zaloUrlOauth = this.configService.get<string>('ZALO_URL_OAUTH') || '';
  }

  async getAccessToken(
    authCode: string,
  ): Promise<TypeResponseZalo | TypeResponseZaloError> {
    const data = {
      app_id: this.zaloAppId,
      secret_key: this.zaloAppSecret,
      code: authCode,
      grant_type: 'authorization_code',
    };

    try {
      const response = await axios.post(this.zaloUrlOauth, data);

      return response.data;
    } catch (error) {
      console.error(
        'Error getting access token:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<TypeResponseZalo | TypeResponseZaloError> {
    const data = {
      app_id: this.zaloAppId,
      secret_key: this.zaloAppSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };

    try {
      const response = await axios.post(this.zaloUrlOauth, data);

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
