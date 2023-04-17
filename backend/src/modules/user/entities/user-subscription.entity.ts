import { Column, Entity } from 'typeorm';

@Entity('UserSubscription')
export class UserSubscription {
  @Column({ length: 50, primary: true })
  userId!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  subscriptionId!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nextSubscriptionId!: string;

  @Column({ type: 'varchar', length: 20 })
  status!: string;

  @Column({ nullable: true, type: 'date' })
  startDate!: Date | null;

  @Column({ nullable: true, type: 'date' })
  endDate!: Date | null;
}
