import { Module } from '@nestjs/common';
import { PacsService } from './pacs.service';
import { PacsController } from './pacs.controller';
import { BV_QLyCapTheModule } from '../BV_QLyCapThe/BV_QLyCapThe.module';
import { BV_PhieuChidinhDVCTModule } from '../BV_PhieuChidinhDVCT/BV_PhieuChidinhDVCT.module';

@Module({
  imports: [BV_QLyCapTheModule, BV_PhieuChidinhDVCTModule],
  providers: [PacsService],
  controllers: [PacsController]
})
export class PacsModule {}
