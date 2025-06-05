import { Module } from '@nestjs/common';
import { BV_QLyCapTheController } from './BV_QLyCapThe.controller';
import { BV_QLyCapTheService } from './BV_QLyCapThe.service';

@Module({
  controllers: [BV_QLyCapTheController],
  providers: [BV_QLyCapTheService],
  exports: [BV_QLyCapTheService],
})
export class BV_QLyCapTheModule {}
