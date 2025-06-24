import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'BV_PhieuSieuam',
})
export class BV_PhieuSieuamEntity {
  @PrimaryColumn()
  ID: string;

  @Column()
  ID_CTDV: string;

  @Column()
  Ngay: Date;

  @Column()
  MaBN: string;

  @Column()
  IDDuyetBHYT: string;

  @Column()
  IDToaThuoc: string;

  @Column()
  MaphieuVT: string;

  @Column()
  Trangthai: string;

  @Column()
  Mota: string;

  @Column()
  DsHinh: string;

  @Column()
  BsChidinh: string;

  @Column()
  TGChidinh: Date;

  @Column()
  BsKham: string;

  @Column()
  BsThuchien: string;

  @Column()
  TGThuchien: Date;

  @Column()
  Denghi: string;

  @Column()
  Diachi: string;

  @Column()
  Dienthoai: string;

  @Column()
  Doituong: string;

  @Column()
  Gioitinh: string;

  @Column()
  Hoten: string;

  @Column()
  Ketluan: string;

  @Column()
  Khoa: string;

  @Column()
  Lamsang: string;

  @Column()
  Loai: string;

  @Column()
  Loaibenh: string;

  @Column()
  MaDV: string;

  @Column()
  MotaVKS: string;

  @Column()
  Namsinh: number;

  @Column()
  Phanloai: string;

  @Column()
  Sonhapvien: number;

  @Column()
  SophieuCD: number;

  @Column()
  Tinh: string;

  @Column()
  Vungkhaosat: string;

  @Column()
  ELoaiibenh: string;

  @Column()
  BsChiutrachnhiem: string;

  @Column()
  CDSauPT: string;

  @Column()
  CDTruocPT: string;

  @Column()
  Clotest: string;

  @Column()
  CoBHYT: boolean;

  @Column()
  MaNoiDKBD: string;

  @Column()
  Dacap: boolean;

  @Column()
  DaIn: number;

  @Column()
  HenTK: boolean;

  @Column()
  KTV: string;

  @Column()
  KTV_Phu1: string;

  @Column()
  KTV_Phu2: string;

  @Column()
  LoaiCLS: number;

  @Column()
  Loaimau: string;

  @Column()
  Loaiphim: string;

  @Column()
  LoaiThuthuat: string;

  @Column()
  Loidan: string;

  @Column()
  Madinhdang: string;

  @Column()
  Ngaycap: Date;

  @Column()
  NgayPCD: Date;

  @Column()
  Ngaykinhcuoi: Date;

  @Column()
  Noichidinh: string;

  @Column()
  Noidung: string;

  @Column()
  NS_Capcuu: boolean;

  @Column()
  NS_Chandoan: boolean;

  @Column()
  NS_Dieutri: boolean;

  @Column()
  NS_GPB: boolean;

  @Column()
  NS_Sinhthiet: boolean;

  @Column()
  Para: string;

  @Column()
  PP_Thuthuat: string;

  @Column()
  PP_Vocam: string;

  @Column()
  SLPhim: number;

  @Column()
  SoBHYT: string;

  @Column()
  SoDienthoai: string;

  @Column()
  TenDVIn: string;

  @Column()
  Thucthu: number;

  @Column()
  Sophieu: string;

  @Column()
  ChandoanChinh: string;

  @Column()
  ChandoanPhu: string;

  @Column()
  UPDATE_DATE: Date;

  @Column()
  TTChung: string;

  @Column()
  PSA_PartionByYear: number;

  @Column()
  PSA_CreatedDate: Date;

  @Column()
  ImageName: string;

  @Column()
  Sovaovien: string;

  @Column()
  MaMay: string;

  @Column()
  BSKyTen: string;
}


