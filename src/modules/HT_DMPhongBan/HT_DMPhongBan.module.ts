import { Module } from '@nestjs/common';
import { HT_DMPhongBanController } from './HT_DMPhongBan.controller';
import { HT_DMPhongBanService } from './HT_DMPhongBan.service';

@Module({
  controllers: [HT_DMPhongBanController],
  providers: [HT_DMPhongBanService],
  exports: [HT_DMPhongBanService],
})
export class HT_DMPhongBanModule {}
