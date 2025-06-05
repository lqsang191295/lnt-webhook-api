import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'BV_PhieuCanlamsang',
})
export class BV_PhieuCanlamsangEntity {
  @PrimaryColumn()
  ID: string;

  @Column()
  Ngay: Date;

  @Column()
  MaBN: string;

  @Column()
  ImageName: string;

  @Column()
  Phanloai: string;
}
