import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { HtThamSoModule } from '../HT_Thamso/HT_Thamso.module';
import { WebhookModule } from '../webhook/webhook.module';
import { HT_CronJobsModule } from '../HT_CronJobs/HT_CronJobs.module';
import { TasksHandlerService } from './tasks-handler.service';

@Module({
  imports: [HtThamSoModule, WebhookModule, HT_CronJobsModule],
  providers: [TasksService, TasksHandlerService],
  controllers: [TasksController],
})
export class TasksModule {}
