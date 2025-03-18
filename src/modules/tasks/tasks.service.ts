import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { TypeJob } from 'src/common/types/task';
import { HT_CronJobsService } from '../HT_CronJobs/HT_CronJobs.service';
import { CronJob } from 'cron';
import { TasksHandlerService } from './tasks-handler.service';

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly ht_CronJobsService: HT_CronJobsService,
    private readonly tasksHandlerService: TasksHandlerService,
  ) {}

  async onModuleInit() {
    try {
      const cronJobs = await this.ht_CronJobsService.findAll();

      if (!cronJobs || !cronJobs.length) return;

      for (let i = 0; i < cronJobs.length; i++) {
        const { name, func, time, status } = cronJobs[i];
        this.addCronJob(name, func, time, status);
      }
    } catch (error) {
      //
    }
  }

  getHandlerFunction(funcName: string): (() => Promise<void>) | null {
    const handlers: Record<string, () => Promise<void>> = {
      handleCronZaloRefreshToken: () =>
        this.tasksHandlerService.handleCronZaloRefreshToken(),
    };

    return handlers[funcName] || null;
  }

  addCronJob(name: string, func: string, time: string, status: boolean) {
    const handler = this.getHandlerFunction(func);

    if (!handler) {
      return;
    }

    const job = new CronJob(`${time}`, async () => {
      await handler();
    });

    this.schedulerRegistry.addCronJob(name, job);

    if (status) {
      job.start();
    } else {
      job.stop();
    }
  }

  // @Cron('10 * * * * *', {
  //   name: 'zalo-refresh-token',
  // })
  // async handleCronZaloRefreshToken() {
  //   console.log('aaaaaaaaaaaaaaaaaaa 45s');
  //   try {
  //     const data = await this.ht_ThamsoService.findById({
  //       Ma: 'RefreshToken_Zalo',
  //     });

  //     if (!data || !data.length) return;

  //     const refreshToken = data[0].Thamso;

  //     if (!refreshToken) return;

  //     this.webhookService.refreshAccessToken(refreshToken);
  //   } catch (ex) {
  //     this.logger.error(ex.message);
  //   }
  // }

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

    this.ht_CronJobsService.update(
      { name: id },
      {
        status: false,
      },
    );

    return;
  }

  startJobById(id: string) {
    const job = this.getJobById(id);

    if (!job) return;

    job.start();
    this.ht_CronJobsService.update(
      { name: id },
      {
        status: true,
      },
    );

    return;
  }
}
