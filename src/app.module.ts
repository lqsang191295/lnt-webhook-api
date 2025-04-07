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
    AD_UserAccountEntity,
    AD_UserLoggedEntity,
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
  providers: [AppService, AuthService, PushNotificationService],
})
export class AppModule {}
