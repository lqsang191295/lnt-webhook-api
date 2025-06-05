import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'BV_PhieuSieuam',
})
export class BV_PhieuSieuamEntity {
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
