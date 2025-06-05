import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'BV_PhieuCanlamsang',
})
export class BV_PhieuCanlamsangEntity {
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
