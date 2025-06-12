import { Body, Controller, Get, Param, Post, Query, UnauthorizedException } from '@nestjs/common';
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
import { ConvertQuerySelect, ConvertQueryWhere, parseCondition } from 'src/helper/query';
import { BV_TiepnhanBenhEntity } from '../BV_TiepnhanBenh/BV_TiepnhanBenh.entity';
import { BV_PhieuTiepNhanCLSService } from '../BV_PhieuTiepNhanCLS/BV_PhieuTiepNhanCLS.service';
import { BV_PhieuTiepNhanCLSEntity } from '../BV_PhieuTiepNhanCLS/BV_PhieuTiepNhanCLS.entity';
import { AD_UserAccountService } from '../AD_UserAccount/AD_UserAccount.service';
import HISCrypto from 'src/common/crypto/HISCrypto';

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
        private readonly phieuTiepNhanCLSService: BV_PhieuTiepNhanCLSService,
        private readonly userAccountService: AD_UserAccountService
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
        @Query('limit') limit: number,
        @Query('orderBy') orderByQuery: string
    ) {
        try {
            const query = this.tiepnhanBenhService.repository
                .createQueryBuilder('tiepnhan')
                .innerJoinAndSelect('tiepnhan.BV_QLyCapThe', 'BV_QLyCapThe');

            // SELECT
            if (selectQuery && selectQuery !== '*') {
                const fields = selectQuery
                    .split(',')
                    .map(f => f.trim())
                    .filter(f => f.length > 0);

                if (fields.length === 0) {
                    return ApiResponse.error('Select fields required!', 400, '');
                }

                query.select([]);

                for (const field of fields) {
                    if (field.includes('.')) {
                        query.addSelect(field);
                    } else {
                        query.addSelect(`tiepnhan.${field}`);
                    }
                }
            }

            // WHERE
            if (whereQuery) {
                const OPERATORS = ['!=', '>=', '<=', '=', '>', '<', 'LIKE'];

                const parseCondition = (condition: string): { field: string, operator: string, value: string } | null => {
                    for (const op of OPERATORS) {
                        const parts = condition.split(op);
                        if (parts.length === 2) {
                            return {
                                field: parts[0].trim(),
                                operator: op,
                                value: parts[1].trim().replace(/^['"]|['"]$/g, '')
                            };
                        }
                    }
                    return null;
                };

                const orGroups = whereQuery.split(/or/i);

                for (let i = 0; i < orGroups.length; i++) {
                    const andConditions = orGroups[i].split('&');
                    const andWhereFns: any[] = [];

                    for (let j = 0; j < andConditions.length; j++) {
                        const cond = andConditions[j].trim();
                        const parsed = parseCondition(cond);

                        if (!parsed) {
                            return ApiResponse.error(`Invalid condition: ${cond}`, 400, '');
                        }

                        const { field, operator, value } = parsed;
                        const paramKey = `param_${i}_${j}`;

                        let clause = '';
                        if (field.includes('.')) {
                            clause = `${field} ${operator} :${paramKey}`;
                        } else {
                            clause = `tiepnhan.${field} ${operator} :${paramKey}`;
                        }

                        andWhereFns.push({ clause, paramKey, value });
                    }

                    const group = andWhereFns.map(e => e.clause).join(' AND ');
                    const params = Object.fromEntries(andWhereFns.map(e => [e.paramKey, e.value]));

                    if (i === 0) {
                        query.where(`(${group})`, params);
                    } else {
                        query.orWhere(`(${group})`, params);
                    }
                }
            }

            // ORDER BY
            if (orderByQuery) {
                const orderBys = orderByQuery.split(',').map(o => o.trim()).filter(Boolean);

                for (const order of orderBys) {
                    let field = order;
                    let direction: 'ASC' | 'DESC' = 'ASC'; // default

                    if (order.includes(':')) {
                        const [fieldPart, dirPart] = order.split(':');
                        field = fieldPart;
                        direction = dirPart.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                    }

                    if (field.includes('.')) {
                        query.addOrderBy(field, direction);
                    } else {
                        query.addOrderBy(`tiepnhan.${field}`, direction);
                    }
                }
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
    @Post('get-BV_TiepnhanBenh')
    async postBV_TiepnhanBenh(
        @Query('where') whereQuery: string,
        @Query('select') selectQuery: string,
        @Query('limit') limit: number
    ) {
        try {
            const query = this.tiepnhanBenhService.repository
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

            // Parse where: MaBN='123' hoặc qlyCapThe.HoTen='ABC'
            if (whereQuery) {
                const match = whereQuery.match(/^(.+?)=['"]?(.+?)['"]?$/);
                if (match) {
                    const [, rawField, rawValue] = match;
                    const value = rawValue.trim();
                    if (rawField.includes('.')) {
                        const [alias, key] = rawField.split('.');
                        query.where(`${alias}.${key} = :value`, { value });
                    } else {
                        query.where(`tiepnhan.${rawField} = :value`, { value });
                    }
                } else {
                    return ApiResponse.error('Invalid where format. Expected: field=value', 400, '');
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

    @Public()
    @Post('check-bac-si')
    async checkBacSi(@Body('user') username: string,
        @Body('pass') password: string) {
        try {
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
}
