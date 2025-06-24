import { Entity, Column,  PrimaryColumn } from 'typeorm';

@Entity({ name: 'HT_DMPhongBan' })
export class HT_DMPhongBanEntity {
  @PrimaryColumn()
  Ma: string;

  @Column({ type: 'nvarchar', length: 255 })
  Ten: string;

  @Column({ type: 'nvarchar', length: 255 })
  MaKhoa: string;

  @Column({ type: 'nvarchar', length: 255 })
  Diengiai: string;

  @Column({ type: 'nvarchar', length: 255 })
  KhoThuoc: string;

  @Column({ type: 'nvarchar', length: 255 })
  KhoVTTTB: string;

  @Column({ type: 'nvarchar', length: 255 })
  KhoVTYT: string;

  @Column({ type: 'nvarchar', length: 255 })
  TKChiphi: string;

  @Column({ type: 'nvarchar', length: 255 })
  TKLuong: string;

  @Column({ type: 'bit', default: false })
  Chon: boolean;

  @Column({ type: 'bit', default: false })
  Noitru: boolean;

  @Column({ type: 'datetime', nullable: true })
  UPDATE_DATE: Date;

  @Column({ type: 'nvarchar', length: 255 })
  Tang: string;
}