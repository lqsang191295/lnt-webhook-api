import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { HT_DMNhanSuEntity } from './HT_DMNhanSu.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class HT_DMNhanSuService extends BaseRepository<HT_DMNhanSuEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, HT_DMNhanSuEntity);
  }
}
