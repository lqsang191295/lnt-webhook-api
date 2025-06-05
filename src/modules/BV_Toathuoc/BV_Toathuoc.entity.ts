import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'BV_Toathuoc',
})
export class BV_ToathuocEntity {
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
