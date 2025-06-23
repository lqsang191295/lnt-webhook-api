import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'BV_PhieuChidinhDV' })
export class BV_PhieuChidinhDVEntity {
  @PrimaryColumn('uuid')
  ID: string;

  @Column('datetime')
  Ngay: Date;

  @Column('nvarchar')
  MaBN: string;

  @Column('uuid')
  IDDangky: string;

  @Column('uuid')
  IDPhieukham: string;

  @Column('uuid')
  IDKhamdoan: string;

  @Column('nvarchar')
  IDNam: string;

  @Column('uuid')
  MaBANgoaitru: string;

  @Column('nvarchar')
  MaDV: string;

  @Column('nvarchar')
  BsKham: string;

  @Column('nvarchar')
  TrangThai: string;

  @Column('nvarchar')
  KhoaPhong: string;

  @Column('nvarchar')
  Sovaovien: string;

  @Column('nvarchar')
  Chandoan: string;

  @Column('nvarchar')
  ChidinhRG_XQ: string;

  @Column('bit')
  Dachon: boolean;

  @Column('bit')
  Dacoketqua: boolean;

  @Column('bit')
  Dathutien: boolean;

  @Column('nvarchar')
  Doituong: string;

  @Column('nvarchar')
  Khoa: string;

  @Column('nvarchar')
  Loaibenhan: string;

  @Column('float')
  MaBHYT: number;

  @Column('datetime')
  NgayDKy: Date;

  @Column('nvarchar')
  Nguoichidinh: string;

  @Column('nvarchar')
  NguoiGT: string;

  @Column('nvarchar')
  Sonhapvien: string;

  @Column('bit')
  BNTuden: boolean;

  @Column('bit')
  Capcuu: boolean;

  @Column('nvarchar')
  ChandoanSobo: string;

  @Column('bit')
  ChidinhChaythan: boolean;

  @Column('bit')
  Chidinhngoaivien: boolean;

  @Column('bit')
  Chidinhtructiep: boolean;

  @Column('bit')
  CLS_Tudo: boolean;

  @Column('bit')
  CTythanhtoan: boolean;

  @Column('bit')
  Dadenghi: boolean;

  @Column('bit')
  Datamung: boolean;

  @Column('nvarchar')
  Ghichu: string;

  @Column('nvarchar')
  KeyPCD_Khac: string;

  @Column('nvarchar')
  KeyToathuoc: string;

  @Column('bit')
  Khamdoan: boolean;

  @Column('bit')
  KhamSK: boolean;

  @Column('bit')
  KhongthanhBHYT: boolean;

  @Column('bit')
  Khongthuchien: boolean;

  @Column('bit')
  Khongthutien: boolean;

  @Column('bit')
  KhongtinhCL: boolean;

  @Column('bit')
  Khongtoa: boolean;

  @Column('nvarchar')
  LoaiCD: string;

  @Column('int')
  LoaiHSBA: number;

  @Column('nvarchar')
  Madinhdang: string;

  @Column('nvarchar')
  Nguoikygiay: string;

  @Column('nvarchar')
  Nguoinhap: string;

  @Column('nvarchar')
  Nguoithuchien: string;

  @Column('nvarchar')
  Nguongioithieu: string;

  @Column('nvarchar')
  Noichuyenden: string;

  @Column('bit')
  Noitru: boolean;

  @Column('bit')
  PhieuVTYT: boolean;

  @Column('nvarchar')
  Phong: string;

  @Column('float')
  PTHoahong: number;

  @Column('nvarchar')
  SoCTBanhang: string;

  @Column('int')
  SolanIn: number;

  @Column('datetime')
  TGQuetthe: Date;

  @Column('float')
  TileUudaiBHYT: number;

  @Column('nvarchar')
  Trangthaitoa: string;

  @Column('bit')
  Vatlytrilieu: boolean;

  @Column('bit')
  VIP: boolean;

  @Column('bit')
  YLenh: boolean;

  @Column('uuid')
  MaBANoiTru: string;

  @Column('uuid')
  IDDuyetBHYT: string;

  @Column('nvarchar')
  Sophieu: string;

  @Column('bit')
  KoTinhCD_Bacsi: boolean;

  @Column('nvarchar')
  LyDoSua_PCD: string;

  @Column('nvarchar')
  MaCongTy: string;

  @Column('uuid')
  IDGoiDV: string;

  @Column('nvarchar')
  SoPhieuChiDinh: string;

  @Column('datetime')
  UPDATE_DATE: Date;
}
