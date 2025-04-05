import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({
  name: 'AD_UserLogged',
})
export class AD_UserLoggedEntity {
  @PrimaryColumn()
  UserID: string;

  @Column()
  Device: string;

  @Column()
  TokenDevice: string;

  @Column()
  IsMainDevice: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;
}
