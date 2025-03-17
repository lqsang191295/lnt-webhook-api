import { Module } from '@nestjs/common';
import { HT_ThamsoService } from './HT_Thamso/HT_Thamso.service';
import { HtThamSoModule } from './HT_Thamso/HT_Thamso.module';

@Module({
  imports: [HtThamSoModule],
  providers: [HT_ThamsoService],
  exports: [HT_ThamsoService],
})
export class ModulesModule {}
