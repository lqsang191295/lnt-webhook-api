import { Injectable } from '@nestjs/common';
import { HT_ThamsoService } from '../HT_Thamso/HT_Thamso.service';
import { WebhookService } from '../webhook/webhook.service';

@Injectable()
export class TasksHandlerService {
  constructor(
    private readonly ht_ThamsoService: HT_ThamsoService,
    private readonly webhookService: WebhookService,
  ) {}

  async handleCronZaloRefreshToken() {
    console.log('aaaaaaaaaaaaaaaaaaa 45s');
    try {
      const data = await this.ht_ThamsoService.findById({
        Ma: 'RefreshToken_Zalo',
      });

      if (!data || !data.length) return;

      const refreshToken = data[0].Thamso;

      if (!refreshToken) return;

      this.webhookService.refreshAccessToken(refreshToken);
    } catch (ex) {
      //
    }
  }
}
