import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'HT_Thongbao',
})
export class HT_ThongbaoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'timestamp',
  })
  created_at: Date;
}
