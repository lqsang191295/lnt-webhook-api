import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse } from 'src/common/api/api-response';
import { Public } from 'src/common/decorators/public.decorator';
import { BV_QLyCapTheService } from '../BV_QLyCapThe/BV_QLyCapThe.service';
import { BV_PhieuSieuamService } from '../BV_PhieuSieuam/BV_PhieuSieuam.service';
import { IsNull, Like, Not } from 'typeorm';
import { BV_ToathuocService } from '../BV_Toathuoc/BV_Toathuoc.service';
import { BV_PhieuXetNghiemService } from '../BV_PhieuXetNghiem/BV_PhieuXetNghiem.service';
import { BV_PhieuCanlamsangService } from '../BV_PhieuCanlamsang/BV_PhieuCanlamsang.service';
import { BV_GiayKhamSucKhoeService } from '../BV_GiayKhamSucKhoe/BV_GiayKhamSucKhoe.service';
import { BV_TiepnhanBenhService } from '../BV_TiepnhanBenh/BV_TiepnhanBenh.service';
import { ConvertQuerySelect, ConvertQueryWhere } from 'src/helper/query';
import { BV_TiepnhanBenhEntity } from '../BV_TiepnhanBenh/BV_TiepnhanBenh.entity';
import { BV_PhieuTiepNhanCLSService } from '../BV_PhieuTiepNhanCLS/BV_PhieuTiepNhanCLS.service';
import { BV_PhieuTiepNhanCLSEntity } from '../BV_PhieuTiepNhanCLS/BV_PhieuTiepNhanCLS.entity';

@Controller('his')
export class HisController {

    constructor(
        private readonly qLyCapTheService: BV_QLyCapTheService,
        private readonly phieuSieuam: BV_PhieuSieuamService,
        private readonly toathuocService: BV_ToathuocService,
        private readonly phieuXetNghiemService: BV_PhieuXetNghiemService,
        private readonly phieuCanlamsangService: BV_PhieuCanlamsangService,
        private readonly giayKhamSucKhoeService: BV_GiayKhamSucKhoeService,
        private readonly tiepnhanBenhService: BV_TiepnhanBenhService,
        private readonly phieuTiepNhanCLSService: BV_PhieuTiepNhanCLSService
    ) { }

    @Public()
    @Get('get-his-data/:mabn')
    async getHISDataByMaBN(@Param('mabn') mabn: string) {
        try {
            const capTheData = await this.qLyCapTheService.repository.find({
                where: {
                    Ma: mabn,
                },
                select: ['Ma', 'Dienthoai', 'Hoten', 'Ngaysinh', 'Gioitinh', 'Thangsinh', 'Namsinh', 'SoBHYT', 'Diachi']
            });
            const sieuAmData = await this.phieuSieuam.repository.find({
                where: {
                    MaBN: mabn,
                    ImageName: Not(IsNull()),
                },
                order: {
                    Ngay: 'DESC',
                },
                select: ['Ngay', 'ImageName'],
            });
            const toaThuocData = await this.toathuocService.repository.find({
                where: {
                    MaBN: mabn,
                    ImageName: Not(IsNull()),
                },
                order: {
                    Ngay: 'DESC',
                },
                select: ['Ngay', 'ImageName'],
            });
            const xetNghiemData = await this.phieuXetNghiemService.repository.find({
                where: {
                    MaBN: mabn,
                    ImageName: Not(IsNull()),
                },
                order: {
                    Ngay: 'DESC',
                },
                select: ['Ngay', 'ImageName'],
            });
            const canLamSangData = await this.phieuCanlamsangService.repository.find({
                where: {
                    MaBN: mabn,
                    ImageName: Not(IsNull()),
                },
                order: {
                    Ngay: 'DESC',
                },
                select: ['Ngay', 'Phanloai', 'ImageName'],
            });
            const ThamDoChucNang = await this.phieuCanlamsangService.repository.find({
                where: {
                    MaBN: mabn,
                    Phanloai: 'Thăm_dò_chức_năng',
                    ImageName: Not(IsNull()),
                },
                order: {
                    Ngay: 'DESC',
                },
                select: ['Ngay', 'Phanloai', 'ImageName'],
            });
            const MauVaKhiMau = await this.phieuCanlamsangService.repository.find({
                where: {
                    MaBN: mabn,
                    Phanloai: 'Máu_Và_Khí_Máu',
                    ImageName: Not(IsNull()),
                },
                order: {
                    Ngay: 'DESC',
                },
                select: ['Ngay', 'Phanloai', 'ImageName'],
            });
            const GiaiPhauBenh = await this.phieuCanlamsangService.repository.find({
                where: {
                    MaBN: mabn,
                    Phanloai: 'GiaiPhauBenh',
                    ImageName: Not(IsNull()),
                },
                order: {
                    Ngay: 'DESC',
                },
                select: ['Ngay', 'Phanloai', 'ImageName'],
            });
            const KhamSucKhoe = await this.giayKhamSucKhoeService.repository.find({
                where: {
                    MaBN: mabn,
                    GiayInKQ: Not(IsNull()),
                },
                order: {
                    Ngay: 'DESC',
                },
                select: ['Ngay', 'GiayInKQ'],
            });

            const results = {
                'capTheData': capTheData,
                'sieuAm': sieuAmData,
                'toaThuoc': toaThuocData,
                'xetNghiem': xetNghiemData,
                'canLamSang': canLamSangData,
                'thamDoChucNang': ThamDoChucNang,
                'mauVaKhiMau': MauVaKhiMau,
                'giaiPhauBenh': GiaiPhauBenh,
                'khamSucKhoe': KhamSucKhoe,
            }

            return ApiResponse.success('Get thong bao success!', results);
        } catch (ex) {
            return ApiResponse.error('Get thong bao failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-his-data-hvt/:hoVaTen')
    async getHISDataByHVT(@Param('hoVaTen') hoVaTen: string) {
        try {
            const capTheData = await this.qLyCapTheService.repository.find({
                where: {
                    Hoten: Like(`%${hoVaTen}%`), // tương đương với [~] trong PHP
                },
                select: [
                    'Ma',
                    'Dienthoai',
                    'Hoten',
                    'Ngaysinh',
                    'Gioitinh',
                    'Thangsinh',
                    'Namsinh',
                    'SoBHYT',
                    'Diachi',
                ],
                take: 100, // tương đương 'LIMIT' => 100
            });
            return ApiResponse.success('Get thong bao success!', capTheData);
        } catch (ex) {
            return ApiResponse.error('Get thong bao failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-otp/:sdt')
    async getOTP(@Param('sdt') sdt: string) {
        try {
            const capTheData = await this.qLyCapTheService.repository.find({
                where: {
                    Dienthoai: sdt,
                },
                select: ['Dienthoai', 'Ma'],
                take: 1, // tương đương LIMIT 1
            });
            return ApiResponse.success('Get thong bao success!', capTheData);
        } catch (ex) {
            return ApiResponse.error('Get thong bao failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-BV_TiepnhanBenh')
    async getBV_TiepnhanBenh(@Query('where') whereQuery: string,
        @Query('select') selectQuery: string, @Query('limit') limit: number) {
        try {
            const where = ConvertQueryWhere<BV_TiepnhanBenhEntity>(whereQuery);
            const select = ConvertQuerySelect<BV_TiepnhanBenhEntity>(selectQuery);
            const data = await this.tiepnhanBenhService.repository.find({
                ...(where ? { where } : {}),
                ...(select ? { select } : {}),
                take: limit
            });

            return ApiResponse.success('Get BV_TiepnhanBenh success!', data);
        } catch (ex) {
            return ApiResponse.error('Get BV_TiepnhanBenh failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-BV_PhieuTiepNhanCLS')
    async getBV_PhieuTiepNhanCLS(@Query('where') whereQuery: string,
        @Query('select') selectQuery: string, @Query('limit') limit: number) {
        try {
            const where = ConvertQueryWhere<BV_PhieuTiepNhanCLSEntity>(whereQuery);
            const select = ConvertQuerySelect<BV_PhieuTiepNhanCLSEntity>(selectQuery);
            const data = await this.phieuTiepNhanCLSService.repository.find({
                ...(where ? { where } : {}),
                ...(select ? { select } : {}),
                take: limit
            });

            return ApiResponse.success('Get BV_PhieuTiepNhanCLS success!', data);
        } catch (ex) {
            return ApiResponse.error('Get BV_PhieuTiepNhanCLS failed!', 500, ex.message);
        }
    }
}
