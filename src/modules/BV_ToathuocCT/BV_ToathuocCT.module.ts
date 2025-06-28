import { Module } from '@nestjs/common';
import { BV_ToathuocCTController } from './BV_ToathuocCT.controller';
import { BV_ToathuocCTService } from './BV_ToathuocCT.service';

@Module({
  controllers: [BV_ToathuocCTController],
  providers: [BV_ToathuocCTService],
  exports: [BV_ToathuocCTService],
})
export class BV_ToathuocCTModule {}
