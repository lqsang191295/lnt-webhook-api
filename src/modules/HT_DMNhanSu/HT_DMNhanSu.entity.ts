import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'HT_DMNhanSu',
})
export class HT_DMNhanSuEntity {
  @PrimaryColumn()
  Ma: string;

  @Column()
  Ten: string;

  @Column()
  Loai: string;

  @Column()
  Chuyenmon: string;

  @Column()
  Phongkhoa: string;

  @Column()
  Chucvu: string;

  @Column()
  TenVT: string;

  @Column('image', { nullable: true })
  AnhChuky: Buffer;

  @Column()
  Bophan: string;

  @Column()
  Diachi: string;

  @Column()
  Dienthoai: string;

  @Column('float')
  Doanhso: number;

  @Column()
  DoituongNS: string;

  @Column()
  DsPhongkham: string;

  @Column()
  DsLoaiNS: string;

  @Column()
  ELoai: string;

  @Column('int')
  FingerID: number;

  @Column()
  LoaiNSPM: string;

  @Column()
  Loaiphu: string;

  @Column()
  MasoNV: string;

  @Column('datetime')
  Ngaysinh: Date;

  @Column('bit')
  Ngungtheodoi: boolean;

  @Column()
  Noilamviec: string;

  @Column()
  PhannhomCTV: string;

  @Column()
  Phongkham: string;

  @Column()
  SoCMND: string;

  @Column('float')
  STT: number;

  @Column('bit')
  Thungan: boolean;

  @Column('bit')
  Truongkhoa: boolean;

  @Column('bit')
  Cohuu: boolean;

  @Column()
  Chungchinghe: string;

  @Column()
  MaLienThong: string;

  @Column()
  PasswordLienThong: string;

  @UpdateDateColumn({ type: 'datetime' })
  UPDATE_DATE: Date;

  @Column()
  MaNhanSu: string;

  @Column('bit')
  BSNgoai: boolean;

  @Column('bit')
  KhongTinhCLS: boolean;
}
