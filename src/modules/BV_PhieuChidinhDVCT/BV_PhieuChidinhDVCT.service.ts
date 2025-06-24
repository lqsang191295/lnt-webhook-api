import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_PhieuChidinhDVCTEntity } from './BV_PhieuChidinhDVCT.entity';
import { DataSource, FindManyOptions } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import jsep from 'jsep';
import { buildWhereFromAst } from 'src/helper/query';

@Injectable()
export class BV_PhieuChidinhDVCTService extends BaseRepository<BV_PhieuChidinhDVCTEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_PhieuChidinhDVCTEntity);
  }

  async getDataCondition(whereQuery: string, selectQuery: string, orderByQuery: string, limit: number) {
    const query = this.repository
      .createQueryBuilder('tiepnhan')
      .innerJoinAndSelect('tiepnhan.BV_QLyCapThe', 'BV_QLyCapThe'); // 👈 Dùng join nếu chỉ cần field

    // Parse select fields
    if (selectQuery && selectQuery !== '*') {
      const fields = selectQuery
        ?.split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0) ?? [];

      if (fields.length === 0) {
        throw new Error('Select fields required!');
      }

      query.select([]); // Clear any default select

      for (const field of fields) {
        if (field.includes('.')) {
          // Quan hệ: qlyCapThe.HoTen => alias.field
          query.addSelect(field);
        } else {
          // Bảng chính: ID, MaBN
          query.addSelect(`tiepnhan.${field}`);
        }
      }
    }

    if (whereQuery) {
      const ast = jsep(whereQuery);
      const { clause, params } = buildWhereFromAst(ast);
      query.where(clause, params);
    }

    // ORDER BY
    if (orderByQuery) {
      const orderBys = orderByQuery.split(',').map(o => o.trim()).filter(Boolean);
      for (const order of orderBys) {
        let field = order;
        let direction: 'ASC' | 'DESC' = 'ASC';
        if (order.includes(':')) {
          const [fieldPart, dirPart] = order.split(':');
          field = fieldPart;
          direction = dirPart.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        }
        query.addOrderBy(field.includes('.') ? field : `tiepnhan.${field}`, direction);
      }
    }

    if (limit && limit > 0) {
      query.take(limit);
    }

    return await query.getMany();
  }
}
