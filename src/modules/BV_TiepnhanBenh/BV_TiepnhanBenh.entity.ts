import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { BV_QLyCapTheEntity } from '../BV_QLyCapThe/BV_QLyCapThe.entity';

@Entity({
  name: 'BV_TiepnhanBenh',
})
export class BV_TiepnhanBenhEntity {
  @PrimaryColumn()
  ID: string;

  @Column()
  Ngay: Date;

  @Column()
  MaBN: string;

  @Column()
  MaBankham: string;

  @Column()
  IDPhieukham: string;

  @Column()
  IDDuyetBHYT: string;

  @Column()
  IDPCD: string;

  @Column()
  IDPhieuthu: string;

  @Column()
  IDHenDK: string;

  @Column()
  IDCongviec: string;

  @Column()
  MaDoan: string;

  @Column()
  Trangthai: string;

  @Column()
  Sovaovien: string;

  @Column()
  Benhmantinh: boolean;

  @Column()
  BsTruc: string;

  @Column()
  Daduyet: boolean;

  @Column()
  Dathutien: boolean;

  @Column()
  Doituong: string;

  @Column()
  Dongtienkham: boolean;

  @Column()
  ETrangthai: string;

  @Column()
  Ghichu: string;

  @Column()
  Ketthuchoso: boolean;

  @Column()
  KhamChuyenkhoa: boolean;

  @Column()
  LoaiDK: string;

  @Column()
  LoaiDoituong: string;

  @Column()
  Nhapsinhieu: boolean;

  @Column()
  SoBenhAn: string;

  @Column('decimal')
  Tongchiphi: number;

  @Column()
  BNTuden: boolean;

  @Column()
  Capcuu: boolean;

  @Column()
  Chungthuc: string;

  @Column()
  CoBHYT: boolean;

  @Column()
  Dadomat: boolean;

  @Column()
  DaluulichBs: boolean;

  @Column()
  Dangxutri: boolean;

  @Column()
  DKTructiep: boolean;

  @Column()
  DK_Bacsi: string;

  @Column()
  DK_Diachi: string;

  @Column()
  DK_Dienthoai: string;

  @Column()
  DK_DVKhac: string;

  @Column()
  DK_EMail: string;

  @Column()
  DK_Hoten: string;

  @Column()
  DK_Nhackham: boolean;

  @Column()
  DK_Sinh_Nam: string;

  @Column()
  DK_Sinh_Ngay: string;

  @Column()
  DK_Sinh_Thang: string;

  @Column()
  DK_TGThuchien: Date;

  @Column()
  EBenhAn: string;

  @Column()
  Hinhthuc: string;

  @Column()
  Khamdoan: boolean;

  @Column()
  KhamSK: boolean;

  @Column()
  KoThuchien: boolean;

  @Column()
  Loaikham: string;

  @Column()
  Lydohuy: string;

  @Column()
  MienphiKham: boolean;

  @Column()
  NguoiDK: string;

  @Column()
  NguoiduyetHH: string;

  @Column()
  NVGioithieu: string;

  @Column()
  PThucDKy: string;

  @Column()
  Quaytiepnhan: string;

  @Column()
  SoBHYT: string;

  @Column()
  Sonhapvien: string;

  @Column()
  SoSeriBHXH: string;

  @Column('decimal')
  Sotien: number;

  @Column('float')
  SoVIP: number;

  @Column()
  STT: number;

  @Column()
  TGDKy: Date;

  @Column()
  TGKetthuc: Date;

  @Column()
  TGTiepnhan: Date;

  @Column()
  VIP: boolean;

  @Column('float')
  Hoahong: number;

  @Column('float')
  HoahongDuyet: number;

  @Column()
  Loaitainan: string;

  @Column()
  Hoibenh_Ghichu: string;

  @Column()
  Hoibenh_Lydo: string;

  @Column()
  Hoibenh_Mau: string;

  @Column()
  Hoibenh_Noidung: string;

  @Column()
  Hoibenh_Chuyenkhoa: string;

  @Column()
  Hoibenh_Tiensu_Banthan: string;

  @Column()
  Hoibenh_Tiensu_Giadinh: string;

  @Column()
  Sinhhieu_BMI: string;

  @Column('float')
  Sinhhieu_Cannang: number;

  @Column('float')
  Sinhhieu_Chieucao: number;

  @Column()
  Sinhhieu_HAmax: number;

  @Column()
  Sinhhieu_HAmin: number;

  @Column()
  Sinhhieu_Mach: number;

  @Column()
  Sinhhieu_Matphai: string;

  @Column()
  Sinhhieu_Mattrai: string;

  @Column('float')
  Sinhhieu_Nhietdo: number;

  @Column('float')
  Sinhhieu_Nhiptho: number;

  @Column('float')
  Sinhhieu_SP02: number;

  @Column()
  Sinhhieu_KinhLoTrai: string;

  @Column()
  Sinhhieu_KinhLoPhai: string;

  @Column()
  Sophieu: string;

  @Column()
  UPDATE_DATE: Date;

  @Column()
  PLBinhthuong: boolean;

  @Column()
  PLTaikhamXV: boolean;

  @Column()
  PLTaikhamNT: boolean;

  @Column()
  PLLaytoaKK: boolean;

  @Column()
  Phanloaibenh: string;

  @Column()
  Lock: boolean;

  @Column()
  LockUser: string;

  @Column()
  IDGoiDV: string;

  @Column()
  KhamDoan_NgayTao: Date;

  @Column()
  DaNhapvien: boolean;

  @Column()
  Sinhhieu_DeoKinhTrai: string;

  @Column()
  Sinhhieu_DeoKinhPhai: string;

  @Column()
  Sinhhieu_NhanApTrai: string;

  @Column()
  Sinhhieu_NhanApPhai: string;

  @OneToOne(() => BV_QLyCapTheEntity, qlyCapThe => qlyCapThe.Ma)
  @JoinColumn({ name: 'MaBN' }) 
  BV_QLyCapThe: BV_QLyCapTheEntity;
}
