import { Module } from '@nestjs/common';
import { HT_DMNhanSuController } from './HT_DMNhanSu.controller';
import { HT_DMNhanSuService } from './HT_DMNhanSu.service';

@Module({
  controllers: [HT_DMNhanSuController],
  providers: [HT_DMNhanSuService],
  exports: [HT_DMNhanSuService],
})
export class HT_DMNhanSuModule {}
