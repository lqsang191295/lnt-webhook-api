import { Body, Controller, Get, Logger, Param, Post, Query, UnauthorizedException } from '@nestjs/common';
import { ApiResponse } from 'src/common/api/api-response';
import { Public } from 'src/common/decorators/public.decorator';
import { BV_QLyCapTheService } from '../BV_QLyCapThe/BV_QLyCapThe.service';
import { BV_PhieuSieuamService } from '../BV_PhieuSieuam/BV_PhieuSieuam.service';
import { FindManyOptions, IsNull, Like, Not } from 'typeorm';
import { BV_ToathuocService } from '../BV_Toathuoc/BV_Toathuoc.service';
import { BV_PhieuXetNghiemService } from '../BV_PhieuXetNghiem/BV_PhieuXetNghiem.service';
import { BV_PhieuCanlamsangService } from '../BV_PhieuCanlamsang/BV_PhieuCanlamsang.service';
import { BV_GiayKhamSucKhoeService } from '../BV_GiayKhamSucKhoe/BV_GiayKhamSucKhoe.service';
import { BV_TiepnhanBenhService } from '../BV_TiepnhanBenh/BV_TiepnhanBenh.service';
import { buildWhereFromAst, ConvertQuerySelect, ConvertQueryWhere, normalizeWhereQuery, parseCondition } from 'src/helper/query';
import { BV_PhieuTiepNhanCLSService } from '../BV_PhieuTiepNhanCLS/BV_PhieuTiepNhanCLS.service';
import { AD_UserAccountService } from '../AD_UserAccount/AD_UserAccount.service';
import jsep from 'jsep';
import { HT_DMPhongBanService } from '../HT_DMPhongBan/HT_DMPhongBan.service';
import { BV_PhieuChidinhDVCTService } from '../BV_PhieuChidinhDVCT/BV_PhieuChidinhDVCT.service';
import { CheckBacSiDto } from './his.dto';
import { formatDateToLocalSQLString } from 'src/helper/timer';
import { BV_PhieuChidinhDVService } from '../BV_PhieuChidinhDV/BV_PhieuChidinhDV.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('his')
export class HisController {
    private readonly logger = new Logger(HisController.name);

    constructor(
        private readonly qLyCapTheService: BV_QLyCapTheService,
        private readonly phieuSieuam: BV_PhieuSieuamService,
        private readonly toathuocService: BV_ToathuocService,
        private readonly phieuXetNghiemService: BV_PhieuXetNghiemService,
        private readonly phieuCanlamsangService: BV_PhieuCanlamsangService,
        private readonly giayKhamSucKhoeService: BV_GiayKhamSucKhoeService,
        private readonly tiepnhanBenhService: BV_TiepnhanBenhService,
        private readonly phieuTiepNhanCLSService: BV_PhieuTiepNhanCLSService,
        private readonly userAccountService: AD_UserAccountService,
        private readonly dmPhongBanService: HT_DMPhongBanService,
        private readonly phieuChidinhDVCTService: BV_PhieuChidinhDVCTService,
        private readonly phieuChidinhDVService: BV_PhieuChidinhDVService
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
    async getBV_TiepnhanBenh(
        @Query('where') whereQuery: string,
        @Query('select') selectQuery: string,
        @Query('limit') limit?: number,
    ) {
        try {
            const query = this.tiepnhanBenhService.repository
                .createQueryBuilder('tiepnhan')
                .innerJoinAndSelect('tiepnhan.BV_QLyCapThe', 'BV_QLyCapThe');

            // SELECT
            if (selectQuery && selectQuery !== '*') {
                const fields = selectQuery.split(',').map(f => f.trim()).filter(Boolean);
                if (fields.length === 0) {
                    return ApiResponse.error('Select fields required!', 400, '');
                }
                query.select([]);
                for (const field of fields) {
                    query.addSelect(field.includes('.') ? field : `tiepnhan.${field}`);
                }
            }

            // WHERE
            if (whereQuery) {
                const normalized = normalizeWhereQuery(whereQuery); // chuyển về JS style
                const parsed = jsep(normalized);                    // parse AST
                const { clause, params } = buildWhereFromAst(parsed); // build SQL
                query.where(clause, params);
            }

            // LIMIT
            if (limit && limit > 0) {
                query.take(limit);
            }
            const data = await query.getMany();
            return ApiResponse.success('Get BV_TiepnhanBenh success!', data);
        } catch (ex) {
            return ApiResponse.error('Get BV_TiepnhanBenh failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-BV_PhieuTiepNhanCLS')
    async getBV_PhieuTiepNhanCLS(
        @Query('where') whereQuery: string,
        @Query('select') selectQuery: string,
        @Query('limit') limit: number,
        @Query('orderBy') orderByQuery?: string,
    ) {
        try {
            const query = this.phieuTiepNhanCLSService.repository
                .createQueryBuilder('tiepnhan')
                .innerJoinAndSelect('tiepnhan.BV_QLyCapThe', 'BV_QLyCapThe'); // 👈 Dùng join nếu chỉ cần field

            // Parse select fields
            if (selectQuery && selectQuery !== '*') {
                const fields = selectQuery
                    ?.split(',')
                    .map(f => f.trim())
                    .filter(f => f.length > 0) ?? [];

                if (fields.length === 0) {
                    return ApiResponse.error('Select fields required!', 400, '');
                }

                query.select([]); // Clear any default select

                for (const field of fields) {
                    if (field.includes('.')) {
                        // Quan hệ: qlyCapThe.HoTen => alias.field
                        query.addSelect(field);
                    } else {
                        // Bảng chính: ID, MaBN
                        query.addSelect(`tiepnhan.${field}`);
                    }
                }
            }

            if (whereQuery) {
                const ast = jsep(whereQuery);
                const { clause, params } = buildWhereFromAst(ast);
                query.where(clause, params);
            }

            // ORDER BY
            if (orderByQuery) {
                const orderBys = orderByQuery.split(',').map(o => o.trim()).filter(Boolean);
                for (const order of orderBys) {
                    let field = order;
                    let direction: 'ASC' | 'DESC' = 'ASC';
                    if (order.includes(':')) {
                        const [fieldPart, dirPart] = order.split(':');
                        field = fieldPart;
                        direction = dirPart.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                    }
                    query.addOrderBy(field.includes('.') ? field : `tiepnhan.${field}`, direction);
                }
            }

            if (limit && limit > 0) {
                query.take(limit);
            }

            const data = await query.getMany();
            return ApiResponse.success('Get BV_TiepnhanBenh success!', data);
        } catch (ex) {
            return ApiResponse.error('Get BV_TiepnhanBenh failed!', 500, ex.message);
        }
    }

    @Public()
    @Post('check-bac-si')
    async checkBacSi(@Body() dto: CheckBacSiDto) {
        try {
            const { user: username, pass: password } = dto;

            if (!username || !password) throw new UnauthorizedException();

            const user = await this.userAccountService.findOne(username);

            if (!user) {
                throw new UnauthorizedException();
            }

            if (this.userAccountService.md5Hash(password) !== user.Password) {
                throw new UnauthorizedException();
            }

            return ApiResponse.success('Check bac si success!', true);
        } catch (ex) {
            return ApiResponse.error('Check bac si failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-HT_DMPhongBan')
    async getHT_DMPhongBan() {
        try {
            const data = await this.dmPhongBanService.findAll();
            return ApiResponse.success('Get HT_DMPhongBan success!', data);
        } catch (ex) {
            return ApiResponse.error('Get HT_DMPhongBan failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-HT_DMPhongBan-query')
    async getHT_DMPhongBanCondition(
        @Query('where') whereQuery: string,
        @Query('select') selectQuery: string,
        @Query('limit') limit: number,
        @Query('orderBy') orderByQuery?: string,
    ) {
        try {
            const where = whereQuery ? JSON.parse(whereQuery) : {};
            const select = selectQuery ? JSON.parse(selectQuery) : undefined;
            const order = orderByQuery ? JSON.parse(orderByQuery) : undefined;

            const options: FindManyOptions = {
                where,
                select,
                take: limit || 100, // default limit
                order,
            };

            const data = await this.dmPhongBanService.repository.find(options);
            return ApiResponse.success('Get HT_DMPhongBan success!', data);
        } catch (ex) {
            return ApiResponse.error('Get HT_DMPhongBan failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-BV_PhieuChidinhDVCT')
    async getBV_PhieuChidinhDVCT(
        @Query('where') whereQuery: string,
        @Query('select') selectQuery: string,
        @Query('limit') limit: number,
        @Query('orderBy') orderByQuery: string,
    ) {
        try {
            this.logger.log(`getBV_PhieuChidinhDVCT Data request: ${JSON.stringify({ whereQuery, selectQuery, orderByQuery, limit })}`);

            const data = await this.phieuChidinhDVCTService.getDataCondition(whereQuery, selectQuery, orderByQuery, limit);

            return ApiResponse.success('Get BV_PhieuChidinhDVCT success!', data);
        } catch (ex) {
            return ApiResponse.error('Get BV_PhieuChidinhDVCT failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-BV_PhieuChidinhDVCT-by-nhom/:nhom')
    async getPhieuChidinhDVCT(
        @Param('nhom') DSNhomDV: string,
    ) {
        try {
            const now = new Date();
            const dayTuNgay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
            const dayDenNgay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            const TuNgay = formatDateToLocalSQLString(dayTuNgay);
            const DenNgay = formatDateToLocalSQLString(dayDenNgay);

            const data = await this.phieuChidinhDVCTService.execProcedure("sp_getBV_PhieuChidinhDVCT_By_Ngay_NhomDV_Waiting_List", {
                DSNhomDV,
                KhoaPhong: null,
                TuNgay,
                DenNgay
            });

            return ApiResponse.success('Get PhieuChidinhDVCT success!', data);
        } catch (ex) {
            return ApiResponse.error('Get PhieuChidinhDVCT failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-BV_PhieuChidinhDVCT-by-nhom/:nhom/:phong')
    async getPhieuChidinhDVCTByPhong(
        @Param('nhom') DSNhomDV: string,
        @Param('phong') KhoaPhong?: string
    ) {
        try {
            const now = new Date();
            const dayTuNgay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
            const dayDenNgay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            const TuNgay = formatDateToLocalSQLString(dayTuNgay);
            const DenNgay = formatDateToLocalSQLString(dayDenNgay);

            const data = await this.phieuChidinhDVCTService.execProcedure("sp_getBV_PhieuChidinhDVCT_By_Ngay_NhomDV_Waiting_List", {
                DSNhomDV,
                KhoaPhong,
                TuNgay,
                DenNgay
            });

            return ApiResponse.success('Get PhieuChidinhDVCT success!', data);
        } catch (ex) {
            return ApiResponse.error('Get PhieuChidinhDVCT failed!', 500, ex.message);
        }
    }

    @Public()
    @Get('get-BV_PhieuChidinhDV')
    @ApiQuery({ name: 'where', required: false, description: 'JSON condition, e.g. {"MaBN":"123"}' })
    @ApiQuery({ name: 'select', required: false, description: 'Fields to select, e.g. MaBN,TrangThai' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit number of records' })
    @ApiQuery({ name: 'orderBy', required: false, description: 'Sort order, e.g. Ngay:DESC' })
    async getBV_PhieuChidinhDV(
        @Query('where') whereQuery?: string,
        @Query('select') selectQuery?: string,
        @Query('limit') limit?: number,
        @Query('orderBy') orderByQuery?: string,
    ) {
        try {
            const data = await this.phieuChidinhDVService.getDataCondition(whereQuery, selectQuery, orderByQuery, limit);
            return ApiResponse.success('Get BV_PhieuChidinhDV success!', data);
        } catch (ex) {
            return ApiResponse.error('Get BV_PhieuChidinhDV failed!', 500, ex.message);
        }
    }
}
