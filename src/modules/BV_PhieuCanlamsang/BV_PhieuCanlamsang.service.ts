import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_PhieuCanlamsangEntity } from './BV_PhieuCanlamsang.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_PhieuCanlamsangService extends BaseRepository<BV_PhieuCanlamsangEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_PhieuCanlamsangEntity);
  }

}
