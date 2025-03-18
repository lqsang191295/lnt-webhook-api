import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'HT_ThamSo',
})
export class HT_ThamSoEntity {
  @PrimaryColumn()
  Ma: string;

  @Column()
  Thamso: string;

  @Column()
  Diengiai: string;

  @UpdateDateColumn({ type: 'timestamp' })
  UPDATE_DATE: Date;
}
