import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'BV_PhieuTiepNhanCLS',
})
export class BV_PhieuTiepNhanCLSEntity {
  @PrimaryColumn('uuid')
  ID: string;

  @Column()
  Ngay: Date;

  @Column()
  SoVaoVien: string;

  @Column()
  MaBN: string;

  @Column()
  TrangThai: string;

  @Column()
  GioVao: Date;

  @Column()
  GioRa: Date;

  @Column()
  LoaiCLS: string;

  @Column()
  GhiChu: string;

  @Column()
  IP: string;
}
