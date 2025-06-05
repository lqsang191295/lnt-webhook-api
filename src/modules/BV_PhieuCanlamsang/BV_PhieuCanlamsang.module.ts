import { Module } from '@nestjs/common';
import { BV_PhieuCanlamsangController } from './BV_PhieuCanlamsang.controller';
import { BV_PhieuCanlamsangService } from './BV_PhieuCanlamsang.service';

@Module({
  controllers: [BV_PhieuCanlamsangController],
  providers: [BV_PhieuCanlamsangService],
  exports: [BV_PhieuCanlamsangService],
})
export class BV_PhieuCanlamsangModule {}
