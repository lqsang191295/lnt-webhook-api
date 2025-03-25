import { Injectable, Logger } from '@nestjs/common';
import { HT_ThamsoService } from '../HT_Thamso/HT_Thamso.service';
import { WebhookService } from '../webhook/webhook.service';
import { HT_CronJobsService } from '../HT_CronJobs/HT_CronJobs.service';

@Injectable()
export class TasksHandlerService {
  private readonly logger = new Logger(TasksHandlerService.name);

  constructor(
    private readonly ht_ThamsoService: HT_ThamsoService,
    private readonly webhookService: WebhookService,
    private readonly ht_CronJobsService: HT_CronJobsService,
  ) {}

  async handleCronZaloRefreshToken(name: string) {
    this.logger.log(`Refresh token at ${new Date()}`);

    try {
      const data = await this.ht_ThamsoService.findById({
        Ma: 'RefreshToken_Zalo',
      });

      if (!data || !data.length) return;

      const refreshToken = data[0].Thamso;

      if (!refreshToken) return;

      this.ht_CronJobsService.update(
        { name },
        {
          updated_at: new Date(),
        },
      );
      this.webhookService.refreshAccessToken(refreshToken);
    } catch (ex) {
      //
    }
  }
}
