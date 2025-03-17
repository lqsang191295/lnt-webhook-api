import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'HT_ThamSo',
})
export class HT_ThamSo {
  @PrimaryColumn()
  Ma: string;

  @Column()
  Thamso: string;

  @Column()
  Diengiai: string;

  @UpdateDateColumn({ type: 'timestamp' })
  UPDATE_DATE: Date;
}
