import { Module } from '@nestjs/common';
import { BV_MasterController } from './BV_Master.controller';
import { BV_MasterService } from './BV_Master.service';

@Module({
  controllers: [BV_MasterController],
  providers: [BV_MasterService],
  exports: [BV_MasterService],
})
export class BV_MasterModule {}
