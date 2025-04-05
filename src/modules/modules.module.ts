import { Module } from '@nestjs/common';
import { HT_ThamsoService } from './HT_Thamso/HT_Thamso.service';
import { HtThamSoModule } from './HT_Thamso/HT_Thamso.module';
import { TasksModule } from './tasks/tasks.module';
import { PushNotificationModule } from './push-notification/push-notification.module';
import { AD_UserAccountModule } from './AD_UserAccount/AD_UserAccount.module';
import { AD_UserLoggedModule } from './AD_UserLogged/AD_UserLogged.module';

@Module({
  imports: [
    HtThamSoModule,
    TasksModule,
    PushNotificationModule,
    AD_UserAccountModule,
    AD_UserLoggedModule,
  ],
  providers: [HT_ThamsoService],
  exports: [HT_ThamsoService],
})
export class ModulesModule {}
