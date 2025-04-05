import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'AD_UserAccount',
})
export class AD_UserAccountEntity {
  @PrimaryColumn()
  UserID: string;

  @Column()
  Password: string;

  @Column()
  GroupID: string;

  @Column()
  Admin: boolean;

  @Column()
  SuperAdmin: boolean;

  @Column()
  Description: string;

  @Column()
  CantChangePwd: boolean;

  @Column()
  PwdNeverExpired: boolean;

  @Column()
  MustChangePwd: boolean;

  @Column()
  Email: string;

  @Column()
  FingerID: string;

  @Column()
  EmpID: string;

  @Column()
  Stop: boolean;

  @Column()
  Khoa: string;

  @UpdateDateColumn({ type: 'timestamp' })
  UPDATE_DATE: Date;
}
