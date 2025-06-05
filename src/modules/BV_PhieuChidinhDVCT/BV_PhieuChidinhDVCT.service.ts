import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_PhieuChidinhDVCTEntity } from './BV_PhieuChidinhDVCT.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_PhieuChidinhDVCTService extends BaseRepository<BV_PhieuChidinhDVCTEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_PhieuChidinhDVCTEntity);
  }

}
