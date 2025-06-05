import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_PhieuSieuamEntity } from './BV_PhieuSieuam.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_PhieuSieuamService extends BaseRepository<BV_PhieuSieuamEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_PhieuSieuamEntity);
  }

}
