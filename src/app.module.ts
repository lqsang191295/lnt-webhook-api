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

console.log(' process.env.NODE_ENV === ', process.env.NODE_ENV);

const config = ConfigModule.forRoot({
  envFilePath:
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local',
  isGlobal: true, // Cho phép sử dụng process.env ở mọi nơi
});

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const configSql = TypeOrmModule.forRoot({
  type: 'mssql',
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false, // Không cần TypeORM tự tạo bảng
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});

@Module({
  imports: [config, configSql, WebhookModule, AuthModule, DatabaseModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
