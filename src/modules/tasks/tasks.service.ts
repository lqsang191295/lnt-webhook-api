import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { TypeJob } from 'src/common/types/task';
import { HT_ThamsoService } from '../HT_Thamso/HT_Thamso.service';
import { WebhookService } from '../webhook/webhook.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly ht_ThamsoService: HT_ThamsoService,
    private readonly webhookService: WebhookService,
  ) {}

  @Cron('10 * * * * *', {
    name: 'zalo-refresh-token',
  })
  async handleCron() {
    console.log('aaaaaaaaaaaaaaaaaaa 45s');
    const data = await this.ht_ThamsoService.findById({
      Ma: 'RefreshToken_Zalo',
    });

    if (!data || !data.length) return;

    const refreshToken = data[0].Thamso;

    if (!refreshToken) return;

    this.webhookService.refreshAccessToken(refreshToken);
  }

  getAllCronJobs() {
    const cronJobs = this.schedulerRegistry.getCronJobs();
    const dataJobs: TypeJob[] = [];

    cronJobs.forEach((job, key, map) => {
      console.log(job.cronTime);
      let next, status;
      try {
        next = job.nextDate().toJSDate();
        status = job.running ? 'running' : 'stopped';
      } catch (e) {
        //
      }

      dataJobs.push({
        name: key,
        time: job.cronTime.source.toString(),
        nextTime: next,
        status,
      });
    });

    return dataJobs;
  }

  getJobById(id: string) {
    return this.schedulerRegistry.getCronJob(id);
  }

  stopJobById(id: string) {
    const job = this.getJobById(id);

    if (!job) return;

    job.stop();

    return;
  }

  startJobById(id: string) {
    const job = this.getJobById(id);

    if (!job) return;

    job.start();

    return;
  }
}
