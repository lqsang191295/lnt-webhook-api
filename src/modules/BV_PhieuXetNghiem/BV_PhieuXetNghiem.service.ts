import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_PhieuXetNghiemEntity } from './BV_PhieuXetNghiem.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_PhieuXetNghiemService extends BaseRepository<BV_PhieuXetNghiemEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_PhieuXetNghiemEntity);
  }

}
