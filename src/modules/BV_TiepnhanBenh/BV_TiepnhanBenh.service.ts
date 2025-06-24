import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_TiepnhanBenhEntity } from './BV_TiepnhanBenh.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_TiepnhanBenhService extends BaseRepository<BV_TiepnhanBenhEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_TiepnhanBenhEntity);
  }

}
