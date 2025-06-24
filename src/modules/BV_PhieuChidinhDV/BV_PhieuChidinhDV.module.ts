import { Module } from '@nestjs/common';
import { BV_PhieuChidinhDVController } from './BV_PhieuChidinhDV.controller';
import { BV_PhieuChidinhDVService } from './BV_PhieuChidinhDV.service';

@Module({
  controllers: [BV_PhieuChidinhDVController],
  providers: [BV_PhieuChidinhDVService],
  exports: [BV_PhieuChidinhDVService],
})
export class BV_PhieuChidinhDVModule {}
