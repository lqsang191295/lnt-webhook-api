import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'BV_Toathuoc',
})
export class BV_ToathuocEntity {
  @PrimaryColumn()
  ID: string;

  @Column()
  Ngay: Date;

  @Column()
  MaBN: string;

  @Column()
  ImageName: string;
}
