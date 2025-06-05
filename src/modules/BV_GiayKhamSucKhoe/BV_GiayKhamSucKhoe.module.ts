import { Module } from '@nestjs/common';
import { BV_GiayKhamSucKhoeController } from './BV_GiayKhamSucKhoe.controller';
import { BV_GiayKhamSucKhoeService } from './BV_GiayKhamSucKhoe.service';

@Module({
  controllers: [BV_GiayKhamSucKhoeController],
  providers: [BV_GiayKhamSucKhoeService],
  exports: [BV_GiayKhamSucKhoeService],
})
export class BV_GiayKhamSucKhoeModule {}
