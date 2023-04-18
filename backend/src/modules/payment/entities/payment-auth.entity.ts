import { Column, Entity } from 'typeorm';

@Entity('PaymentAuth')
export class PaymentAuth {
  @Column({ type: 'varchar', length: 50, primary: true })
  userId!: string;

  @Column({ type: 'varchar', length: 50 })
  code!: string;

  @Column({ length: 10 })
  card!: string;

  @Column({ nullable: true, type: 'timestamptz' })
  expiresAt!: Date | null;
}
