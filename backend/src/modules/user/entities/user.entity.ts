import { Column, Entity } from 'typeorm';

@Entity('User')
export class User {
  @Column({ length: 50, primary: true })
  id!: string;

  @Column({ length: 500 })
  firstName!: string;

  @Column({ length: 500 })
  lastName!: string;

  @Column({ length: 500 })
  email!: string;

  @Column('text')
  password!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  subscriptionId!: string | null;

  @Column({ nullable: true, type: 'date' })
  subscriptionStartDate!: Date | null;

  @Column({ nullable: true, type: 'date' })
  subscriptionEndDate!: Date | null;
}
