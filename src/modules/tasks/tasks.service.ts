import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { TypeJob } from '../../common/types/task';
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
    this.logger.log(`TasksService run onModuleInit at ${new Date()}`)
    try {
      const cronJobs = await this.ht_CronJobsService.findAll();

      console.log('cronJobs === ', cronJobs)
      this.logger.log(`TasksService cronJobs at ${cronJobs} --- ${cronJobs?.length}`)

      if (!cronJobs || !cronJobs.length) return;

      for (let i = 0; i < cronJobs.length; i++) {
        const { name, func, time, status } = cronJobs[i];
        this.logger.log(`TasksService cronJobs 1111 at ${name} --- ${func} --- ${time} --- ${status}`)

        this.addCronJob(name, func, time, status);
      }
    } catch (error) {
      //
    }
  }

  getHandlerFunction(
    funcName: string,
  ): ((name: string) => Promise<void>) | null {
    const handlers: Record<string, (name: string) => Promise<void>> = {
      handleCronZaloRefreshToken: (name: string) =>
        this.tasksHandlerService.handleCronZaloRefreshToken(name),
    };

    return handlers[funcName] || null;
  }

  addCronJob(name: string, func: string, time: string, status: boolean) {
    try {
      const handler = this.getHandlerFunction(func);

      if (!handler) {
        return;
      }

      this.logger.log(`TasksService cronJobs 2222 at ${handler}`)

      const job = new CronJob(`${time}`, async () => {
        await handler(name);
      });


      this.schedulerRegistry.addCronJob(name, job);

      if (status) {
        job.start();
      } else {
        job.stop();
      }
    } catch (ex) {
      this.logger.log(`addCronJob failed at ${name} error: ${ex.message}`)
      console.log('error addCronJob', ex);
    }
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

    this.logger.log('Stop job by id ', job)

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

  async startJobById(id: string) {
    const job = this.getJobById(id);

    this.logger.log(`'Start job by id ${id} 111 aaa', ${!job}, 'bbb', ${job?.running}`)


    // if (!job) {
    //   const cronJobs = await this.ht_CronJobsService.findById({
    //     name: id
    //   });

    //   this.logger.log('Start job by id  cronJobs', cronJobs)

    //   if (!cronJobs || !cronJobs.length) return;

    //   for (let i = 0; i < cronJobs.length; i++) {
    //     const { name, func, time, status } = cronJobs[i];
    //     this.logger.log('Start job by id cronJobs name', name, func, time, status)
    //     this.addCronJob(name, func, time, status);
    //   }

    //   return;
    // }

    if(job) {
      this.schedulerRegistry.deleteCronJob(id);
    }

    const cronJobs = await this.ht_CronJobsService.findById({
      name: id
    });

    this.logger.log('Start job by id  cronJobs', cronJobs)

    if (!cronJobs || !cronJobs.length) return;

    for (let i = 0; i < cronJobs.length; i++) {
      const { name, func, time, status } = cronJobs[i];
      this.logger.log('Start job by id cronJobs name', name, func, time, status)
      this.addCronJob(name, func, time, true);
    }

    this.ht_CronJobsService.update(
      { name: id },
      {
        status: true,
      },
    );

    return;
  }
}
