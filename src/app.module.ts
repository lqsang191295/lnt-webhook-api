import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './modules/webhook/webhook.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from './modules/helper/helper.module';
import { GuardModule } from './modules/guard/guard.module';
import { JwtModule } from '@nestjs/jwt';
import { ModulesModule } from './modules/modules.module';
import { HT_CronJobsEntity } from './modules/HT_CronJobs/HT_CronJobs.entity';
import { HT_ThamSoEntity } from './modules/HT_Thamso/HT_ThamSo.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { AD_UserAccountEntity } from './modules/AD_UserAccount/AD_UserAccount.entity';
import { AD_UserLoggedEntity } from './modules/AD_UserLogged/AD_UserLogged.entity';
import { PushNotificationModule } from './modules/push-notification/push-notification.module';
import { PushNotificationService } from './modules/push-notification/push-notification.service';
import { HT_ThongbaoEntity } from './modules/HT_Thongbao/HT_Thongbao.entity';
import { BV_QLyCapTheEntity } from './modules/BV_QLyCapThe/BV_QLyCapThe.entity';
import { BV_PhieuChidinhDVCTEntity } from './modules/BV_PhieuChidinhDVCT/BV_PhieuChidinhDVCT.entity';
import { BV_PhieuSieuamEntity } from './modules/BV_PhieuSieuam/BV_PhieuSieuam.entity';
import { BV_ToathuocEntity } from './modules/BV_Toathuoc/BV_Toathuoc.entity';
import { BV_PhieuXetNghiemEntity } from './modules/BV_PhieuXetNghiem/BV_PhieuXetNghiem.entity';
import { BV_PhieuCanlamsangEntity } from './modules/BV_PhieuCanlamsang/BV_PhieuCanlamsang.entity';
import { BV_GiayKhamSucKhoeEntity } from './modules/BV_GiayKhamSucKhoe/BV_GiayKhamSucKhoe.entity';
import { BV_TiepnhanBenhEntity } from './modules/BV_TiepnhanBenh/BV_TiepnhanBenh.entity';
import { BV_PhieuTiepNhanCLSEntity } from './modules/BV_PhieuTiepNhanCLS/BV_PhieuTiepNhanCLS.entity';
import { HT_DMPhongBanEntity } from './modules/HT_DMPhongBan/HT_DMPhongBan.entity';
// import { AppGateway } from './Gateway/app.gateway';

console.log(' process.env.NODE_ENV === ', process.env.NODE_ENV);

const config = ConfigModule.forRoot({
  envFilePath:
    process.env.NODE_ENV === 'production' ? '.env.prod.local' : '.env.local',
  isGlobal: true, // Cho phép sử dụng process.env ở mọi nơi
});

const {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRESIN,
} = process.env;

console.log({
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRESIN,
})

const configSql = TypeOrmModule.forRoot({
  type: 'mssql',
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  entities: [
    HT_ThamSoEntity,
    HT_CronJobsEntity,
    HT_ThongbaoEntity,
    AD_UserAccountEntity,
    AD_UserLoggedEntity,
    BV_QLyCapTheEntity,
    BV_PhieuChidinhDVCTEntity,
    BV_PhieuSieuamEntity,
    BV_ToathuocEntity, BV_PhieuXetNghiemEntity, BV_PhieuCanlamsangEntity, BV_GiayKhamSucKhoeEntity,
    BV_TiepnhanBenhEntity,
    BV_PhieuTiepNhanCLSEntity,
    HT_DMPhongBanEntity
  ],
  synchronize: false,
});

const jwtConfig = JwtModule.register({
  global: true,
  secret: JWT_SECRET,
  signOptions: { expiresIn: JWT_EXPIRESIN },
});

@Module({
  imports: [
    jwtConfig,
    config,
    configSql,
    GuardModule,
    WebhookModule,
    AuthModule,
    HelperModule,
    ConfigModule,
    ModulesModule,
    ScheduleModule.forRoot(),
    PushNotificationModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PushNotificationService, 
    // AppGateway

  ],
})
export class AppModule { }
