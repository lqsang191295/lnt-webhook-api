import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { HtThamSoModule } from '../HT_Thamso/HT_Thamso.module';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
  imports: [HtThamSoModule, WebhookModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
