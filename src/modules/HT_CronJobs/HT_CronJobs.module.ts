import { Module } from '@nestjs/common';
import { HT_CronJobsService } from './HT_CronJobs.service';
import { HT_CronJobsController } from './HT_CronJobs.controller';

@Module({
  controllers: [HT_CronJobsController],
  providers: [HT_CronJobsService],
  exports: [HT_CronJobsService],
})
export class HT_CronJobsModule {}
