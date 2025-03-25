import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'HT_CronJobs',
})
export class HT_CronJobsEntity {
  @PrimaryColumn()
  name: string;

  @Column()
  func: string;

  @Column()
  time: string;

  @Column()
  status: boolean;

  @Column()
  action_status: string;

  @Column()
  updated_at: Date;
}
