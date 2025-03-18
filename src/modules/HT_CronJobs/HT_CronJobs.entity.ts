import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

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
}
