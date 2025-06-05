import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'BV_GiayKhamSucKhoe',
})
export class BV_GiayKhamSucKhoeEntity {
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
