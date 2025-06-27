import { Module } from '@nestjs/common';
import { HT_DMKhoaPhongController } from './HT_DMKhoaPhong.controller';
import { HT_DMKhoaPhongService } from './HT_DMKhoaPhong.service';

@Module({
  controllers: [HT_DMKhoaPhongController],
  providers: [HT_DMKhoaPhongService],
  exports: [HT_DMKhoaPhongService],
})
export class HT_DMKhoaPhongModule {}
