import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'HT_DMKhoaPhong' })
export class HT_DMKhoaPhongEntity {
  @PrimaryColumn()
  Ma: string;

  @Column()
  Ten: string;

  @Column()
  ThuocKhoa: string;

  @Column('int')
  Loai: number;

  @Column()
  ChucNang: string;

  @Column()
  GhiChu: string;

  @Column()
  Kho: string;

  @Column()
  KhoTaiKhoa: string;

  @UpdateDateColumn({ type: 'datetime' })
  UPDATE_DATE: Date;
}
