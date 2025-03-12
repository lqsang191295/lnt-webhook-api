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
  host: '172.16.0.91',
  username: 'sa',
  password: 'salnt123',
  database: 'HIS_DATA',
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
