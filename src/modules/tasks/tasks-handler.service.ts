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

      const result = await this.webhookService.refreshAccessToken(refreshToken);

      if ('error' in result) {
        this.ht_CronJobsService.update(
          { name },
          {
            action_status: 'fail',
            updated_at: new Date(),
          },
        );
        return;
      }

      await this.ht_ThamsoService.saveToken(
        result.access_token,
        result.refresh_token,
      );

      this.ht_CronJobsService.update(
        { name },
        {
          action_status: 'success',
          updated_at: new Date(),
        },
      );
    } catch (ex) {
      this.ht_CronJobsService.update(
        { name },
        {
          action_status: 'fail',
          updated_at: new Date(),
        },
      );
    }
  }
}
