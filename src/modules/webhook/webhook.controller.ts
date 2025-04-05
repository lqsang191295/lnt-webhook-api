import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { HT_ThamsoService } from '../../modules/HT_Thamso/HT_Thamso.service';
import { ApiResponse } from '../../common/api/api-response';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly htThamSoService: HT_ThamsoService,
  ) {}

  @Post()
  async handleWebHook(@Body() body: Record<string, unknown>) {
    try {
      const { code, oaId } = body;

      console.log('Code:', code);
      console.log('OA_ID:', oaId);

      if (code && oaId) {
        const data = await this.webhookService.getAccessToken(code as string);

        if ('error' in data) {
          return ApiResponse.error(
            'Refresh token failed!',
            500,
            data.error_reason,
          );
        }

        await this.htThamSoService.saveToken(
          data.access_token,
          data.refresh_token,
        );

        return ApiResponse.success('Handle token success!', {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });
      }
    } catch (error) {
      console.log('Error ', error);
      return ApiResponse.error('Refresh token failed!', 500, error.message);
    }
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    try {
      const data = await this.webhookService.refreshAccessToken(refreshToken);

      if ('error' in data) {
        return ApiResponse.error(
          'Refresh token failed!',
          500,
          data.error_reason,
        );
      }

      await this.htThamSoService.saveToken(
        data.access_token,
        data.refresh_token,
      );

      return ApiResponse.success('Refresh token success!', {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
    } catch (error) {
      return ApiResponse.error('Refresh token failed!', 500, error.message);
    }
  }
}
