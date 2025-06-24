import { Module } from '@nestjs/common';
import { BV_PhieuXetNghiemController } from './BV_PhieuXetNghiem.controller';
import { BV_PhieuXetNghiemService } from './BV_PhieuXetNghiem.service';

@Module({
  controllers: [BV_PhieuXetNghiemController],
  providers: [BV_PhieuXetNghiemService],
  exports: [BV_PhieuXetNghiemService],
})
export class BV_PhieuXetNghiemModule {}
