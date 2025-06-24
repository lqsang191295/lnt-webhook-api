import { Module } from '@nestjs/common';
import { BV_TiepnhanBenhController } from './BV_TiepnhanBenh.controller';
import { BV_TiepnhanBenhService } from './BV_TiepnhanBenh.service';

@Module({
  controllers: [BV_TiepnhanBenhController],
  providers: [BV_TiepnhanBenhService],
  exports: [BV_TiepnhanBenhService],
})
export class BV_TiepnhanBenhModule {}
