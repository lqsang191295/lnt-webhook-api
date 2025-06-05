import { Module } from '@nestjs/common';
import { AD_UserAccountController } from './AD_UserAccount.controller';
import { AD_UserAccountService } from './AD_UserAccount.service';

@Module({
  controllers: [AD_UserAccountController],
  providers: [AD_UserAccountService],
  exports: [AD_UserAccountService],
})
export class AD_UserAccountModule {}
