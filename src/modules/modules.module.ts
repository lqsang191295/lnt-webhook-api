import { Module } from '@nestjs/common';
import { HT_ThamsoService } from './HT_Thamso/HT_Thamso.service';
import { HtThamSoModule } from './HT_Thamso/HT_Thamso.module';
import { TasksModule } from './tasks/tasks.module';
import { PushNotificationModule } from './push-notification/push-notification.module';

@Module({
  imports: [HtThamSoModule, TasksModule, PushNotificationModule],
  providers: [HT_ThamsoService],
  exports: [HT_ThamsoService],
})
export class ModulesModule {}
