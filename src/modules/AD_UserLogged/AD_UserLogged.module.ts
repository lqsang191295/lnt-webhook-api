import { Module } from '@nestjs/common';
import { AD_UserLoggedController } from './AD_UserLogged.controller';
import { AD_UserLoggedService } from './AD_UserLogged.service';

@Module({
  controllers: [AD_UserLoggedController],
  providers: [AD_UserLoggedService],
  exports: [AD_UserLoggedService],
})
export class AD_UserLoggedModule {}
