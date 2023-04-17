import { Column, Entity } from 'typeorm';

@Entity('UserSubscription')
export class UserSubscription {
  @Column({ length: 50, primary: true })
  userId!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  subscriptionId!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nextSubscriptionId!: string;

  @Column({ nullable: true, type: 'date' })
  subscriptionStartDate!: Date | null;

  @Column({ nullable: true, type: 'date' })
  subscriptionEndDate!: Date | null;
}
