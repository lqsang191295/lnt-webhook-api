import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'BV_GiayKhamSucKhoe',
})
export class BV_GiayKhamSucKhoeEntity {
  @PrimaryColumn()
  ID: string;

  @Column()
  Ngay: Date;

  @Column()
  MaBN: string;

  @Column()
  ImageName: string;

  @Column()
  GiayInKQ: string;
}
