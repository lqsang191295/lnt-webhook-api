import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'BV_PhieuXetNghiem',
})
export class BV_PhieuXetNghiemEntity {
  @PrimaryGeneratedColumn()
  Ma: string;
  
  @Column()
  Hoten: string;

  @Column()
  Diachi: string;

  @Column()
  Ngaysinh: string;

  @Column()
  Thangsinh: string;

  @Column()
  Namsinh: string;
}
