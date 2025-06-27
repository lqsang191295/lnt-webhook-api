import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'BV_Master' })
export class BV_MasterEntity {
  @PrimaryColumn()
  Sovaovien: string;

  @Column('nvarchar')
  MaBN: string;

  @Column('datetime')
  Ngay: Date;

  @Column('nvarchar')
  Doituong: string;

  @Column('bit')
  CoBHYT: boolean;

  @Column('nvarchar')
  LydoVV: string;

  @Column('nvarchar')
  TrieuchungLS: string;

  @Column('nvarchar')
  ChandoanChinh: string;

  @Column('nvarchar')
  ChandoanPhu: string;

  @Column('nvarchar')
  ChandoanKhac: string;

  @Column('datetime')
  TGVao: Date;

  @Column('datetime')
  TGRa: Date;

  @Column('smallint')
  LoaiVV: number;

  @Column('nvarchar')
  KhoaPhong: string;

  @Column('nvarchar')
  BsDieutri: string;

  @Column('decimal')
  Tongchiphi: number;

  @Column('decimal')
  Tongthu: number;

  @Column('decimal')
  Tamung: number;

  @Column('decimal')
  Giam: number;

  @Column('decimal')
  BHYTTT: number;

  @Column('smallint')
  Trangthai: number;

  @Column('nvarchar')
  Ghichu: string;

  @Column('bit')
  Khachvanglai: boolean;

  @Column('decimal')
  SoTienDeNghiTamUng: number;

  @Column('decimal')
  TienDichVuChuaThu: number;

  @Column('decimal')
  TienThuocChuaThu: number;

  @Column('decimal')
  TienCLSChuaThu: number;

  @Column('decimal')
  TienDichVuBHYTChuaThu: number;

  @Column('decimal')
  TienThuocBHYTChuaThu: number;

  @Column('decimal')
  TienCLSBHYTChuaThu: number;

  @Column('int')
  TrangThaiThu: number;

  @UpdateDateColumn({ type: 'datetime' })
  UPDATE_DATE: Date;

  @Column('bit')
  TrangThaiNhapVien: boolean;

  @Column('nvarchar')
  NoiGioiThieu: string;

  @Column('nvarchar')
  HinhThucVV: string;

  @Column('bit')
  ChuyenTuyen: boolean;

  @Column('nvarchar')
  NguoiGioiThieu: string;

  @Column('bit')
  isNuocNgoai: boolean;

  @Column('nvarchar')
  Ma_PTTT_ICD9: string;

  @Column('nvarchar')
  MaNoiDen: string;

  @Column('nvarchar')
  MaKhoaDieuTri: string;

  @Column('nvarchar')
  SoGiayChuyenTuyen: string;

  @Column('nvarchar')
  CanNang: string;

  @Column('nvarchar')
  CanNangCon: string;

  @Column('date')
  NgayTaiKham: Date;

  @Column('nvarchar')
  ChanDoan: string;

  @Column('nvarchar')
  PP_DIEU_TRI: string;

  @Column('nvarchar')
  KET_QUA_DTRI: string;

  @Column('nvarchar')
  MA_LOAI_RV: string;

  @Column('nvarchar')
  DuPhong: string;

  @Column('nvarchar')
  MA_DOITUONG_KCB: string;

  @Column('nvarchar')
  MA_LOAI_KCB: string;

  @Column('nvarchar')
  TOMTAT_KQ: string;

  @Column('nvarchar')
  DienTienBenh: string;

  @Column('nvarchar')
  KET_QUA_DTRI2: string;

  @Column('nvarchar')
  MA_LOAI_RV2: string;

  @Column('nvarchar')
  PP_VO_CAM: string;

  @Column('bit')
  isNghiHuongBHXH: boolean;

  @Column('nvarchar')
  SoNgayNghi: string;

  @Column('datetime')
  NghiBHXHTuNgay: Date;

  @Column('datetime')
  NghiBHXHDenNgay: Date;

  @Column('nvarchar')
  TuoiThai: string;

  @Column('nvarchar')
  MaDinhChiThai: string;

  @Column('nvarchar')
  NguyenNhanDinhChi: string;

  @Column('int')
  SoNgayNghiRV: number;

  @Column('datetime')
  NghiRVTuNgay: Date;

  @Column('datetime')
  NghiRVDenNgay: Date;

  @Column('nvarchar')
  BSTruongKhoa: string;

  @Column('datetime')
  NgaySinhCon: Date;

  @Column('nvarchar')
  MA_DOITUONG_KCB_130: string;

  @Column('nvarchar')
  TomTat_HSBA: string;

  @Column('datetime')
  NgayVaoNoiTru: Date;

  @Column('nvarchar')
  MaLyDoVaoNT: string;

  @Column('nvarchar')
  LydoVaoNoiTru: string;

  @Column('decimal')
  TienThuocTra: number;

  @Column('nvarchar')
  KyGiamDoc: string;

  @Column('bit')
  isLayHoaDon: boolean;

  @Column('bit')
  isKHDCampuchia: boolean;

  @Column('bit')
  isGoiPhauThuat: boolean;

  @Column('bit')
  isRaVien: boolean;

  @Column('bit')
  UpHD: boolean;
}
