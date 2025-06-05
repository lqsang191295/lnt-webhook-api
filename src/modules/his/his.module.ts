import { Module } from '@nestjs/common';
import { HisService } from './his.service';
import { HisController } from './his.controller';
import { BV_QLyCapTheModule } from '../BV_QLyCapThe/BV_QLyCapThe.module';
import { BV_PhieuSieuamModule } from '../BV_PhieuSieuam/BV_PhieuSieuam.module';
import { BV_ToathuocModule } from '../BV_Toathuoc/BV_Toathuoc.module';
import { BV_PhieuXetNghiemModule } from '../BV_PhieuXetNghiem/BV_PhieuXetNghiem.module';
import { BV_PhieuCanlamsangModule } from '../BV_PhieuCanlamsang/BV_PhieuCanlamsang.module';
import { BV_GiayKhamSucKhoeModule } from '../BV_GiayKhamSucKhoe/BV_GiayKhamSucKhoe.module';

@Module({
  imports: [BV_QLyCapTheModule, BV_PhieuSieuamModule, BV_ToathuocModule, BV_PhieuXetNghiemModule, BV_PhieuCanlamsangModule, BV_GiayKhamSucKhoeModule],
  providers: [HisService],
  controllers: [HisController]
})
export class HisModule {}
