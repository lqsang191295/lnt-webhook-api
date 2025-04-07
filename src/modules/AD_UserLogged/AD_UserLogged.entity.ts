import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'AD_UserLogged',
})
export class AD_UserLoggedEntity {
  @PrimaryColumn()
  UserID: string;

  @Column()
  Device: string;

  @PrimaryColumn()
  TokenDevice: string;

  @Column()
  IsMainDevice: boolean;

  @Column({
    type: 'timestamp',
  })
  create_at: Date;
}
