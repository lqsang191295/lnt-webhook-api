import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_PhieuTiepNhanCLSEntity } from './BV_PhieuTiepNhanCLS.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_PhieuTiepNhanCLSService extends BaseRepository<BV_PhieuTiepNhanCLSEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_PhieuTiepNhanCLSEntity);
  }

}
