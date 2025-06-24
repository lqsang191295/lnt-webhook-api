import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AD_UserAccountEntity } from './AD_UserAccount.entity';
import { AD_UserAccountDto } from './AD_UserAccount.dto';
import * as crypto from 'crypto';

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

  md5Hash(pass: string): string {
    const hash = crypto.createHash('md5');
    hash.update(pass, 'ascii'); // giống ASCIIEncoding.ASCII
    return hash.digest('hex');  // giống ToString("x2") trong vòng lặp C#
  }
}
