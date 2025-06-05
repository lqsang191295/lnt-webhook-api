import { Module } from '@nestjs/common';
import { BV_PhieuChidinhDVCTController } from './BV_PhieuChidinhDVCT.controller';
import { BV_PhieuChidinhDVCTService } from './BV_PhieuChidinhDVCT.service';

@Module({
  controllers: [BV_PhieuChidinhDVCTController],
  providers: [BV_PhieuChidinhDVCTService],
  exports: [BV_PhieuChidinhDVCTService],
})
export class BV_PhieuChidinhDVCTModule {}
