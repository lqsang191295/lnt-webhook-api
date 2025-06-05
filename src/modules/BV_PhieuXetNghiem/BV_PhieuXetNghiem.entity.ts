import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'BV_PhieuXetNghiem',
})
export class BV_PhieuXetNghiemEntity {
  @PrimaryColumn()
  ID: string;

  @Column()
  Ngay: Date;

  @Column()
  MaBN: string;

  @Column()
  ImageName: string;
}
