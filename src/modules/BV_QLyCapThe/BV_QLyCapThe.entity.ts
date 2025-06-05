import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'BV_QLyCapThe' })
export class BV_QLyCapTheEntity {
  @PrimaryGeneratedColumn()
  Ma: string;  // Thông thường PrimaryGeneratedColumn là number

  @Column({ type: 'datetime', nullable: true })
  Ngay?: Date;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Hoten?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  HotenKoDau?: string;

  @Column({ type: 'int', nullable: true })
  Ngaysinh?: number;

  @Column({ type: 'int', nullable: true })
  Thangsinh?: number;

  @Column({ type: 'int', nullable: true })
  Namsinh?: number;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Dienthoai?: string;

  @Column({ type: 'nvarchar', length: 10, nullable: true })
  Gioitinh?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Email?: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  Diachi?: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  SoCMND?: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  Doituong?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Nghenghiep?: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  Dantoc?: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  Quoctich?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Tinhquan?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  QuanHuyen?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  PhuongXa?: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  TTHonnhan?: string;

  @Column({ type: 'int', nullable: true })
  STT?: number;

  @Column({ type: 'bit', nullable: true })
  DaInthe?: boolean;

  @Column({ type: 'nvarchar', length: 1000, nullable: true })
  Ghichu?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  NguonGioithieu?: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  LoaiNguonGT?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  NguoiGT?: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  Nguoithan_Diachi?: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Nguoithan_Dienthoai?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Nguoithan_Hoten?: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  Nguoithan_Quanhe?: string;

  @Column({ type: 'nvarchar', length: 10, nullable: true })
  Nguoithan_Namsinh?: string;

  @Column({ type: 'bit', nullable: true })
  BenhMantinh?: boolean;

  @Column({ type: 'bit', nullable: true })
  Benhnoitru?: boolean;

  @Column({ type: 'bit', nullable: true })
  BNTuden?: boolean;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  CTythanhtoan?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  DVDangky?: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  HDDiachi?: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  HDMasothue?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  HDTen?: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  Loaithe?: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  LoaitheTV?: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  MaCTy?: string;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  SoBHYT?: string;

  @Column({ type: 'bit', nullable: true })
  BHYT_TN?: boolean;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  ManoiDKBHYT?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  SoSeriBHXH?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Masothuchien?: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  MatheNV?: string;

  @Column({ type: 'datetime', nullable: true })
  Ngaykhamcu?: Date;

  @Column({ type: 'datetime', nullable: true })
  Ngaykhamcuoi?: Date;

  @Column({ type: 'bit', nullable: true })
  NhanEmail?: boolean;

  @Column({ type: 'bit', nullable: true })
  NhanSMS?: boolean;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Noilamviec?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Password?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  SID?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Sotaikhoan?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  Thanhtoanboi?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  ThanhtoanTen?: string;

  @Column({ type: 'bit', nullable: true })
  TheKhuyenmai?: boolean;

  @Column({ type: 'bit', nullable: true })
  TheTratruoc?: boolean;

  @Column({ type: 'bit', nullable: true })
  Thuchien?: boolean;

  @Column({ type: 'bit', nullable: true })
  Tiemnang?: boolean;

  @Column({ type: 'bit', nullable: true })
  Tuvan?: boolean;

  @Column({ type: 'datetime', nullable: true })
  Ngaycapnhat?: Date;

  @Column({ type: 'bit', nullable: true })
  DaKichHoat?: boolean;

  @Column({ type: 'bit', nullable: true })
  KhachKhoTinh?: boolean;

  @Column({ type: 'bit', nullable: true })
  KhachVip?: boolean;

  @Column({ type: 'nvarchar', length: 1000, nullable: true })
  Ghichu_Khachhang?: string;

  @Column({ type: 'datetime', nullable: true })
  UPDATE_DATE?: Date;

  @Column({ type: 'bit', nullable: true })
  KhachCanhBao?: boolean;

  @Column({ type: 'int', nullable: true })
  SoKg?: number;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  BN_NuocNgoai?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  TTChung?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  MaKhuVuc?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  HoTenVIP?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  MaVIP?: string;

  @Column({ type: 'datetime', nullable: true })
  NgayCapVIP?: Date;

  @Column({ type: 'datetime', nullable: true })
  NgayHieuLuc?: Date;

  @Column({ type: 'bit', nullable: true })
  KichHoatVIP?: boolean;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  IDMe?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  SoVaoVienMe?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  HoTenCha?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  SoBHXHCha?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  HoTenMe?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  SoBHXHMe?: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  MaTheTam?: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  NhomMau?: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  ChieuCao?: string;

  @Column({ type: 'datetime', nullable: true })
  NgayCapCCCD?: Date;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  NoiCapCCCD?: string;
}
