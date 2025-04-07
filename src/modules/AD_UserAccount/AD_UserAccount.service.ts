import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AD_UserAccountEntity } from './AD_UserAccount.entity';
import { AD_UserAccountDto } from './AD_UserAccount.dto';

@Injectable()
export class AD_UserAccountService extends BaseRepository<AD_UserAccountEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, AD_UserAccountEntity);
  }

  async findOne(username: string): Promise<AD_UserAccountDto | null> {
    const data = await this.findById([{ UserID: username }]);

    if (!data) return null;

    return data[0];
  }
}
