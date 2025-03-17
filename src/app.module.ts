import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { HelperModule } from './helper/helper.module';
import { UserModule } from './user/user.module';
import { GuardModule } from './guard/guard.module';
import { JwtModule } from '@nestjs/jwt';
import { ModulesModule } from './modules/modules.module';
import { HT_ThamSo } from './modules/HT_Thamso/HT_ThamSo.entity';

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
  entities: [HT_ThamSo],
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
    DatabaseModule,
    HelperModule,
    UserModule,
    ConfigModule,
    ModulesModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
