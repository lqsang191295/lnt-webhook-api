import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_QLyCapTheEntity } from './BV_QLyCapThe.entity';
import { DataSource, FindManyOptions } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_QLyCapTheService extends BaseRepository<BV_QLyCapTheEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_QLyCapTheEntity);
  }

  async getDataCondition(
    whereQuery?: string,
    selectQuery?: string,
    orderByQuery?: string,
    limit?: number
  ) {
    const options: FindManyOptions<BV_QLyCapTheEntity> = {};

    // WHERE
    if (whereQuery) {
      try {
        options.where = JSON.parse(whereQuery);
      } catch (error) {
        throw new Error('Invalid JSON in whereQuery');
      }
    }

    // SELECT
    if (selectQuery && selectQuery !== '*') {
      const fields = selectQuery
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);
      options.select = fields as (keyof BV_QLyCapTheEntity)[];
    }

    // ORDER BY
    if (orderByQuery) {
      options.order = this.buildOrder(orderByQuery);
    }

    // LIMIT
    if (limit && limit > 0) {
      options.take = limit;
    }

    return await this.repository.find(options);
  }

  private buildOrder(orderByQuery: string) {
    const order: Record<string, 'ASC' | 'DESC'> = {};
    orderByQuery.split(',').forEach(orderStr => {
      const [field, dir] = orderStr.trim().split(':');
      order[field] = (dir?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC') as 'ASC' | 'DESC';
    });
    return order;
  }
}
