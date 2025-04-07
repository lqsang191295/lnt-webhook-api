import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ModulesModule } from '../modules.module';
import { PushNotificationModule } from '../push-notification/push-notification.module';

@Module({
  imports: [ModulesModule, PushNotificationModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
