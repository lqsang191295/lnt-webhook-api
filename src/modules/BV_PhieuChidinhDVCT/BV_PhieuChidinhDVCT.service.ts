import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_PhieuChidinhDVCTEntity } from './BV_PhieuChidinhDVCT.entity';
import { DataSource, FindManyOptions } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_PhieuChidinhDVCTService extends BaseRepository<BV_PhieuChidinhDVCTEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_PhieuChidinhDVCTEntity);
  }

  async getDataCondition(whereQuery: string, selectQuery: string, orderByQuery: string, limit: number) {
    const where = whereQuery ? JSON.parse(whereQuery) : {};
    const select = selectQuery && selectQuery !== '*' ? JSON.parse(selectQuery) : undefined;
    const order = orderByQuery ? JSON.parse(orderByQuery) : undefined;

    const options: FindManyOptions = {
      where,
      select,
      take: limit || 100, // default limit
      order,
    };

    return await this.repository.find(options);
  }
}
