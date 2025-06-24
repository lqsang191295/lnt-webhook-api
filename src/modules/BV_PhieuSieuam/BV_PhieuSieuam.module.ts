import { Module } from '@nestjs/common';
import { BV_PhieuSieuamController } from './BV_PhieuSieuam.controller';
import { BV_PhieuSieuamService } from './BV_PhieuSieuam.service';

@Module({
  controllers: [BV_PhieuSieuamController],
  providers: [BV_PhieuSieuamService],
  exports: [BV_PhieuSieuamService],
})
export class BV_PhieuSieuamModule {}
