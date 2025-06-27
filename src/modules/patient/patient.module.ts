import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { BV_PhieuChidinhDVCTModule } from '../BV_PhieuChidinhDVCT/BV_PhieuChidinhDVCT.module';
import { BV_PhieuChidinhDVModule } from '../BV_PhieuChidinhDV/BV_PhieuChidinhDV.module';
import { HT_DMNhanSuModule } from '../HT_DMNhanSu/HT_DMNhanSu.module';
import { HT_DMKhoaPhongModule } from '../HT_DMKhoaPhong/HT_DMKhoaPhong.module';
import { BV_ToathuocCTModule } from '../BV_ToathuocCT/BV_ToathuocCT.module';
import { BV_ToathuocModule } from '../BV_Toathuoc/BV_Toathuoc.module';
import { BV_MasterModule } from '../BV_Master/BV_Master.module';

@Module({
  imports: [BV_PhieuChidinhDVModule, BV_PhieuChidinhDVCTModule, HT_DMNhanSuModule, HT_DMKhoaPhongModule, BV_ToathuocCTModule, BV_ToathuocModule,
    BV_MasterModule
  ],
  providers: [PatientService],
  controllers: [PatientController]
})
export class PatientModule { }
