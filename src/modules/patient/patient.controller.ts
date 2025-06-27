import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from 'src/common/api/api-response';
import { Public } from 'src/common/decorators/public.decorator';
import { BV_PhieuChidinhDVService } from '../BV_PhieuChidinhDV/BV_PhieuChidinhDV.service';
import { BV_PhieuChidinhDVCTService } from '../BV_PhieuChidinhDVCT/BV_PhieuChidinhDVCT.service';
import { HT_DMNhanSuService } from '../HT_DMNhanSu/HT_DMNhanSu.service';
import { HT_DMKhoaPhongService } from '../HT_DMKhoaPhong/HT_DMKhoaPhong.service';
import { BV_ToathuocService } from '../BV_Toathuoc/BV_Toathuoc.service';
import { BV_ToathuocCTService } from '../BV_ToathuocCT/BV_ToathuocCT.service';
import { BV_MasterService } from '../BV_Master/BV_Master.service';

@Controller('patient')
export class PatientController {

    constructor(
        private readonly phieuChidinhDVService: BV_PhieuChidinhDVService,
        private readonly phieuChidinhDVCTService: BV_PhieuChidinhDVCTService,
        private readonly dmNhanSuService: HT_DMNhanSuService,
        private readonly dmKhoaPhongService: HT_DMKhoaPhongService,
        private readonly toathuocService: BV_ToathuocService,
        private readonly toathuocCTService: BV_ToathuocCTService,
        private readonly masterService: BV_MasterService
    ) { }

    @Public()
    @Get('get-phieu-cd/:mabn')
    async getPhieuCd(@Param('mabn') mabn: string) {
        try {
            const phieuCD = await this.phieuChidinhDVService.findById({
                MaBN: mabn
            }, ["MaDV", "ID", "MaBN", "Chandoan", "KhoaPhong", "BsKham", "Ghichu", "Khoa", "Ngay"]);

            if (!phieuCD || phieuCD.length === 0) {
                return ApiResponse.error('Get getBV_QLyCapThe failed!', 500, "No data");
            }

            const data: any[] = [];

            for (const item of phieuCD) {
                const objData = { ...item } as any;
                const phieuDVCT = await this.phieuChidinhDVCTService.findById({
                    IDPCD: item.ID
                }, ["ID", "MaDV", "TenDV", "Ngay", "Dathuchien"]);
                const ttBacSi = await this.dmNhanSuService.findOneById({
                    Ma: item.BsKham
                }, ["Ten"])
                 const ttKhoaPhong = await this.dmKhoaPhongService.findOneById({
                    Ma: item.Khoa
                }, ["Ten"])

                objData.phieuDVCT = phieuDVCT;
                objData.TenBsKham = ttBacSi?.Ten;
                objData.TenKhoa = ttKhoaPhong?.Ten;

                data.push(objData);
            }

            return ApiResponse.success('Get getBV_QLyCapThe success!', data);
        } catch (ex) {
            return ApiResponse.error('Get getBV_QLyCapThe failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-toa-thuoc/:mabn')
    async getToaThuoc(@Param('mabn') mabn: string) {
        try {
            const toathuoc = await this.toathuocService.findById({
                MaBN: mabn
            }, ["ID", "MaBN", "Ngay", "Doituong", "Ketluan", "Ghichu", 'Khoa', "BsKetoa"]);

            if (!toathuoc || toathuoc.length === 0) {
                return ApiResponse.error('Get getBV_QLyCapThe failed!', 500, "No data");
            }

            const data: any[] = [];

            for (const item of toathuoc) {
                const objData = { ...item } as any;
                const toaThuocCT = await this.toathuocCTService.findById({
                    ID_Toa: item.ID
                }, ["ID", "Ma", "Ten", "Ngay", "Hoatchat", "Hamluong", "Dongia", "DongiaBH", "Soluong", "SLSang", "SLTrua", "SLChieu", "SLToi", "Donvi", "Ghichu"]);
                const ttBacSi = await this.dmNhanSuService.findOneById({
                    Ma: item.BsKetoa
                }, ["Ten"])
                 const ttKhoaPhong = await this.dmKhoaPhongService.findOneById({
                    Ma: item.Khoa
                }, ["Ten"])

                objData.toaThuocCT = toaThuocCT;
                objData.TenBsKeToa = ttBacSi?.Ten;
                objData.TenKhoa = ttKhoaPhong?.Ten;

                data.push(objData);
            }

            return ApiResponse.success('Get success!', data);
        } catch (ex) {
            return ApiResponse.error('Get failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-tiep-nhan/:mabn')
    async getTiepNhan(@Param('mabn') mabn: string) {
        try {
            const tiepnhan = await this.masterService.findById({
                MaBN: mabn
            }, ["MaBN", "Sovaovien", "Ngay", "Doituong", "Ghichu", 'LydoVV', "TGVao", "Tongchiphi", "KhoaPhong", "BsDieutri"]);

            if (!tiepnhan || tiepnhan.length === 0) {
                return ApiResponse.error('Get failed!', 500, "No data");
            }

            const data: any[] = [];

            for (const item of tiepnhan) {
                const objData = { ...item } as any;
                // const toaThuocCT = await this.toathuocCTService.findById({
                //     ID_Toa: item.ID
                // }, ["ID", "Ma", "Ten", "Ngay", "Hoatchat", "Hamluong", "Dongia", "DongiaBH", "Soluong", "SLSang", "SLTrua", "SLChieu", "SLToi", "Donvi", "Ghichu"]);
                const ttBacSi = await this.dmNhanSuService.findOneById({
                    Ma: item.BsDieutri
                }, ["Ten"])
                 const ttKhoaPhong = await this.dmKhoaPhongService.findOneById({
                    Ma: item.KhoaPhong
                }, ["Ten"])

                // objData.toaThuocCT = toaThuocCT;
                objData.TenBsDieutri = ttBacSi?.Ten;
                objData.TenKhoa = ttKhoaPhong?.Ten;

                data.push(objData);
            }

            return ApiResponse.success('Get success!', data);
        } catch (ex) {
            return ApiResponse.error('Get failed!', 500, ex.message);
        }
    }
}
