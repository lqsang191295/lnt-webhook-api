import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_ToathuocCTEntity } from './BV_ToathuocCT.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_ToathuocCTService extends BaseRepository<BV_ToathuocCTEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_ToathuocCTEntity);
  }
}
