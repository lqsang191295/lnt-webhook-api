import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { BV_QLyCapTheEntity } from '../BV_QLyCapThe/BV_QLyCapThe.entity';

@Entity({
  name: 'HT_DMPhongBan',
})
export class HT_DMPhongBanEntity {
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

  @OneToOne(() => BV_QLyCapTheEntity, qlyCapThe => qlyCapThe.Ma)
  @JoinColumn({ name: 'MaBN' }) 
  BV_QLyCapThe: BV_QLyCapTheEntity;
}
