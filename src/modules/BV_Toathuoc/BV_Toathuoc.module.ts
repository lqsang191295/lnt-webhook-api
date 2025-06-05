import { Module } from '@nestjs/common';
import { BV_ToathuocController } from './BV_Toathuoc.controller';
import { BV_ToathuocService } from './BV_Toathuoc.service';

@Module({
  controllers: [BV_ToathuocController],
  providers: [BV_ToathuocService],
  exports: [BV_ToathuocService],
})
export class BV_ToathuocModule {}
