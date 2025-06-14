import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { BV_QLyCapTheEntity } from '../BV_QLyCapThe/BV_QLyCapThe.entity';

@Entity({
  name: 'BV_PhieuTiepNhanCLS',
})
export class BV_PhieuTiepNhanCLSEntity {
  @PrimaryColumn('uuid')
  ID: string;

  @Column()
  Ngay: string;

  @Column()
  SoVaoVien: string;

  @Column()
  MaBN: string;

  @Column()
  TrangThai: string;

  @Column()
  GioVao: string;

  @Column()
  GioRa: string;

  @Column()
  LoaiCLS: string;

  @Column()
  GhiChu: string;

  @Column()
  IP: string;

  @OneToOne(() => BV_QLyCapTheEntity, qlyCapThe => qlyCapThe.Ma)
  @JoinColumn({ name: 'MaBN' }) 
  BV_QLyCapThe: BV_QLyCapTheEntity;
}
