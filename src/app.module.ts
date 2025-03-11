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

const config = ConfigModule.forRoot({
  isGlobal: true, // Cho phép sử dụng process.env ở mọi nơi
});

const configSql = TypeOrmModule.forRoot({
  type: 'mssql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: '',
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
