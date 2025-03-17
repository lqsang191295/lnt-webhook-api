import { Module } from '@nestjs/common';
import { HT_ThamsoController } from './HT_Thamso.controller';
import { HT_ThamsoService } from './HT_Thamso.service';

@Module({
  controllers: [HT_ThamsoController],
  providers: [HT_ThamsoService],
  exports: [HT_ThamsoService],
})
export class HtThamSoModule {}
