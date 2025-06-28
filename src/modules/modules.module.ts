import { Module } from '@nestjs/common';
import { HT_ThamsoService } from './HT_Thamso/HT_Thamso.service';
import { HtThamSoModule } from './HT_Thamso/HT_Thamso.module';
import { TasksModule } from './tasks/tasks.module';
import { AD_UserAccountModule } from './AD_UserAccount/AD_UserAccount.module';
import { AD_UserLoggedModule } from './AD_UserLogged/AD_UserLogged.module';
import { AD_UserAccountService } from './AD_UserAccount/AD_UserAccount.service';
import { AD_UserLoggedService } from './AD_UserLogged/AD_UserLogged.service';
import { NotificationModule } from './notification/notification.module';
import { HT_ThongbaoModule } from './HT_Thongbao/HT_Thongbao.module';
import { PacsModule } from './pacs/pacs.module';
import { BV_QLyCapTheService } from './BV_QLyCapThe/BV_QLyCapThe.service';
import { BV_QLyCapTheModule } from './BV_QLyCapThe/BV_QLyCapThe.module';
import { HisModule } from './his/his.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    HtThamSoModule,
    TasksModule,
    AD_UserAccountModule,
    AD_UserLoggedModule,
    HT_ThongbaoModule,
    BV_QLyCapTheModule,
    NotificationModule,
    PacsModule,
    HisModule,
    PatientModule,
  ],
  providers: [HT_ThamsoService, AD_UserAccountService, AD_UserLoggedService, BV_QLyCapTheService],
  exports: [HT_ThamsoService, AD_UserAccountService, AD_UserLoggedService, BV_QLyCapTheService],
})
export class ModulesModule {}
