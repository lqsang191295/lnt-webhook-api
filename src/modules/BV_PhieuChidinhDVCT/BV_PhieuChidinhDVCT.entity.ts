import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { BV_QLyCapTheEntity } from '../BV_QLyCapThe/BV_QLyCapThe.entity';

@Entity({ name: 'BV_PhieuChidinhDVCT' })
export class BV_PhieuChidinhDVCTEntity {
  @PrimaryColumn('uuid')
  ID: string;

  @Column('uuid')
  IDPCD: string;

  @Column('nvarchar')
  MaDV: string;

  @Column('nvarchar')
  TenDV: string;

  @Column('nvarchar')
  Sovaovien: string;

  @Column('nvarchar')
  MaBN: string;

  @Column('datetime')
  Ngay: Date;

  @Column('nvarchar')
  Nguoichidinh: string;

  @Column('datetime')
  TGChidinh: Date;

  @Column('nvarchar')
  Doituong: string;

  @Column('nvarchar')
  Nhom: string;

  @Column('smallint')
  LoaiCLS: number;

  @Column('nvarchar')
  KhoaPhong: string;

  @Column('nvarchar')
  Donvitinh: string;

  @Column('decimal')
  Soluong: number;

  @Column('decimal')
  DongiaDM: number;

  @Column('decimal')
  Dongia: number;

  @Column('decimal')
  DongiaBH: number;

  @Column('bit')
  TinhBHYT: boolean;

  @Column('bit')
  BHYTTinhCL: boolean;

  @Column('decimal')
  TileBHYT: number;

  @Column('bit')
  Datamung: boolean;

  @Column('bit')
  Dathutien: boolean;

  @Column('bit')
  Dathuchien: boolean;

  @Column('smallint')
  SolanIn: number;

  @Column('bit')
  Mienphi: boolean;

  @Column('bit')
  DVKham: boolean;

  @Column('uuid')
  ID_Thuchien: string;

  @Column('datetime')
  TGThuchien: Date;

  @Column('nvarchar')
  Nguoithuchien: string;

  @Column('uuid')
  ID_PTCT: string;

  @Column('datetime')
  TGThutien: Date;

  @Column('nvarchar')
  Ketqua: string;

  @Column('decimal')
  Tongchiphi: number;

  @Column('decimal')
  BHChi: number;

  @Column('decimal')
  Giam: number;

  @Column('decimal')
  Tongthu: number;

  @Column('decimal')
  Thucthu: number;

  @Column('bit')
  In: boolean;

  @Column('bit')
  KhamChuyenkhoa: boolean;

  @Column('bit')
  TinhDVPhi: boolean;

  @Column('decimal')
  DVPhi: number;

  @Column('decimal')
  PTPhi: number;

  @Column('bit')
  Pacs: boolean;

  @Column('uuid')
  StudyUID: string;

  @Column('smallint')
  STT: number;

  @Column('bit')
  KoThutien: boolean;

  @Column('datetime')
  UPDATE_DATE: Date;

  @Column('bit')
  ThuTienChungToaThuoc: boolean;

  @Column('nvarchar')
  SoPhieu: string;

  @Column('nvarchar')
  TrangThai: string;

  @Column('bit')
  IsCovid: boolean;

  @Column('datetime')
  NgayHenTaiKham: Date;

  @Column('bit')
  GuiSMS: boolean;

  @Column('bit')
  GuiZalo: boolean;

  @Column('nvarchar')
  GhiChuTiemNgua: string;

  @Column('nvarchar')
  MaMay: string;

  @Column('nvarchar')
  NguoiGioiThieu: string;

  @Column('bit')
  GoiKSK: boolean;

  @Column('nvarchar')
  LoaiKham: string;

  @Column('nvarchar')
  NguoiChiDinhUpdate: string;

  @Column('nvarchar')
  NguoiThucHienUpdate: string;

  @Column('nvarchar')
  DuPhong1: string;

  @Column('nvarchar')
  UserUpdate: string;

  @Column('nvarchar')
  GhiChu: string;

  @Column('bit')
  DaChiTien: boolean;

  @Column('nvarchar')
  GhiChuChiTien: string;

  @Column('datetime')
  NgayChiTien: Date;

  @Column('bit')
  LuuChatGPT: boolean;

  @Column('bit')
  DuPhong2: boolean;

  @Column('nvarchar')
  MaGoi: string;

  @Column('nvarchar')
  LoaiPhauThuat: string;

  @Column('nvarchar')
  MaGoiTienMe: string;

  @Column('nvarchar')
  MaGoiGayMe: string;

  @Column('nvarchar')
  MaGoiThuoc: string;

  @Column('bit')
  isHuongCLS: boolean;

  @Column('nvarchar')
  BD_DieuDuongGT: string;

  @Column('nvarchar')
  BD_DieuDuongCD: string;

  @Column('nvarchar')
  BD_DieuDuongTH: string;

  @Column('nvarchar')
  BD_PTV1: string;

  @Column('nvarchar')
  BD_PTV2: string;

  @Column('nvarchar')
  BD_BacSiGM: string;

  @Column('nvarchar')
  BD_KtvGM1: string;

  @Column('nvarchar')
  BD_KtvGM2: string;

  @Column('nvarchar')
  BD_PhuMo1: string;

  @Column('nvarchar')
  BD_PhuMo2: string;

  @Column('nvarchar')
  BD_PhuMo3: string;

  @Column('nvarchar')
  BD_DungCu1: string;

  @Column('nvarchar')
  BD_DungCu2: string;

  @Column('nvarchar')
  BD_DungCu3: string;

  @Column('bit')
  isNuocNgoai: boolean;

  @Column('decimal')
  TienChenhLechNN: number;

  @Column('nchar')
  SoPhieuCD: string;

  @Column('nvarchar')
  Chuan_PACS: string;

  @Column('nvarchar')
  LinkImage: string;

  @Column('nvarchar')
  Link: string;

  @OneToOne(() => BV_QLyCapTheEntity, qlyCapThe => qlyCapThe.Ma)
  @JoinColumn({ name: 'MaBN' })
  BV_QLyCapThe: BV_QLyCapTheEntity;
}
