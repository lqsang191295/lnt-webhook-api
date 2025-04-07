import { Module } from '@nestjs/common';
import { HT_ThamsoService } from './HT_Thamso/HT_Thamso.service';
import { HtThamSoModule } from './HT_Thamso/HT_Thamso.module';
import { TasksModule } from './tasks/tasks.module';
import { AD_UserAccountModule } from './AD_UserAccount/AD_UserAccount.module';
import { AD_UserLoggedModule } from './AD_UserLogged/AD_UserLogged.module';
import { AD_UserAccountService } from './AD_UserAccount/AD_UserAccount.service';
import { AD_UserLoggedService } from './AD_UserLogged/AD_UserLogged.service';

@Module({
  imports: [
    HtThamSoModule,
    TasksModule,
    AD_UserAccountModule,
    AD_UserLoggedModule,
  ],
  providers: [HT_ThamsoService, AD_UserAccountService, AD_UserLoggedService],
  exports: [HT_ThamsoService, AD_UserAccountService, AD_UserLoggedService],
})
export class ModulesModule {}
