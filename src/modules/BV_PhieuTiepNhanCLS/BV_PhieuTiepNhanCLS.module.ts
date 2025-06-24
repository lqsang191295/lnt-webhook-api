import { Module } from '@nestjs/common';
import { BV_PhieuTiepNhanCLSController } from './BV_PhieuTiepNhanCLS.controller';
import { BV_PhieuTiepNhanCLSService } from './BV_PhieuTiepNhanCLS.service';

@Module({
  controllers: [BV_PhieuTiepNhanCLSController],
  providers: [BV_PhieuTiepNhanCLSService],
  exports: [BV_PhieuTiepNhanCLSService],
})
export class BV_PhieuTiepNhanCLSModule {}
