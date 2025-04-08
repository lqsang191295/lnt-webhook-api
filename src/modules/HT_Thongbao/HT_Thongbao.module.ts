import { Module } from '@nestjs/common';
import { HT_ThongbaoController } from './HT_Thongbao.controller';
import { HT_ThongbaoService } from './HT_Thongbao.service';

@Module({
  controllers: [HT_ThongbaoController],
  providers: [HT_ThongbaoService],
  exports: [HT_ThongbaoService],
})
export class HT_ThongbaoModule {}
