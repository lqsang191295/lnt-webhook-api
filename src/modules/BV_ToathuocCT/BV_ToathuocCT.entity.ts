import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'BV_ToathuocCT' })
export class BV_ToathuocCTEntity {
  @PrimaryColumn('uuid')
  ID: string;

  @Column('uuid')
  ID_Toa: string;

  @Column('datetime')
  Ngay: Date;

  @Column()
  MaBN: string;

  @Column()
  Sovaovien: string;

  @Column()
  Ma: string;

  @Column()
  Ten: string;

  @Column()
  Nhom: string;

  @Column()
  MaKho: string;

  @Column()
  Hoatchat: string;

  @Column()
  Hamluong: string;

  @Column()
  Phanloai: string;

  @Column('date')
  Handung: Date;

  @Column('decimal')
  Dongia: number;

  @Column('decimal')
  DongiaBH: number;

  @Column('decimal')
  Soluong: number;

  @Column()
  Donvi: string;

  @Column()
  Donvidung: string;

  @Column()
  SLSang: string;

  @Column()
  SLTrua: string;

  @Column()
  SLChieu: string;

  @Column()
  SLToi: string;

  @Column('smallint')
  SongayDung: number;

  @Column()
  Cachdung: string;

  @Column()
  Luongdung: string;

  @Column()
  Landung: string;

  @Column()
  KhoangcachSD: string;

  @Column('bit')
  BHTunhan: boolean;

  @Column('decimal')
  BHYTChi: number;

  @Column('decimal')
  TileBH: number;

  @Column()
  BsKetoa: string;

  @Column('bit')
  TinhBHYT: boolean;

  @Column('bit')
  DaCap: boolean;

  @Column('bit')
  DaDenghi: boolean;

  @Column('bit')
  DaIn: boolean;

  @Column('bit')
  Dathu: boolean;

  @Column('bit')
  Datra: boolean;

  @Column('bit')
  DaUong: boolean;

  @Column('bit')
  Daxacnhan: boolean;

  @Column('bit')
  Dahuy: boolean;

  @Column('bit')
  Dichvugoi: boolean;

  @Column()
  Ghichu: string;

  @Column('bit')
  KoThutien: boolean;

  @Column('datetime')
  TGKetoa: Date;

  @Column('datetime')
  TGCapthuoc: Date;

  @Column('datetime')
  TGXacnhan: Date;

  @Column('bit')
  NgoaiDM: boolean;

  @Column('bit')
  Phanungthuoc: boolean;

  @Column('decimal')
  SLDatra: number;

  @Column()
  Solo: string;

  @Column('decimal')
  SoluongConlai: number;

  @Column('decimal')
  SoluongPhat: number;

  @Column('decimal')
  SoluongTra: number;

  @Column('decimal')
  Thuesuat: number;

  @Column('bit')
  DVKTC: boolean;

  @Column('bit')
  Khonglaythuoc: boolean;

  @Column('bit')
  ThuocPhauthuat: boolean;

  @Column('bit')
  ThuocRavien: boolean;

  @Column('bit')
  ThuocThan: boolean;

  @Column('bit')
  TinhCL: boolean;

  @Column('bit')
  Tutruc: boolean;

  @Column('bit')
  VTYT: boolean;

  @Column()
  Trangthai: string;

  @Column('bit')
  TinhDVPhi: boolean;

  @Column('decimal')
  DVPhi: number;

  @Column('decimal')
  PTPhi: number;

  @Column()
  Nguoicap: string;

  @Column()
  Quaycap: string;

  @Column()
  Nguoihuycap: string;

  @Column('smallint')
  STT: number;

  @Column('bit')
  KoTutinh: boolean;

  @UpdateDateColumn({ type: 'datetime' })
  UPDATE_DATE: Date;

  @Column('bit')
  ThuocGayTe: boolean;

  @Column()
  NoiCap: string;

  @Column('bit')
  BuTuTruc: boolean;

  @Column()
  HamLuong2: string;

  @Column()
  LuongDung2: string;

  @Column()
  Sophieu: string;

  @Column('bit')
  GayNghien: boolean;

  @Column()
  MaKhoa: string;

  @Column('bit')
  isThuocXuLy: boolean;

  @Column('uuid')
  IDChiDinhGoi: string;

  @Column()
  MaGoi: string;

  @Column('bit')
  GayMe: boolean;

  @Column('bit')
  isNuocNgoai: boolean;

  @Column('decimal')
  TienChenhLechNN: number;
}
