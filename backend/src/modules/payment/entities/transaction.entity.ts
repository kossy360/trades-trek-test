import { BeforeInsert, Column, Entity } from 'typeorm';
import { generateId } from '../../../common/utils/generate-id.js';
import { ETransactionStatus } from '../types/transaction.type.js';

@Entity('Transaction')
export class Transaction {
  @Column({ length: 50, primary: true })
  id!: string;

  @Column({ length: 50 })
  userId!: string;

  @Column({ type: 'jsonb' })
  data!: unknown;

  @Column({ length: 10 })
  type!: string;

  @Column({ type: 'varchar', length: 10 })
  status!: ETransactionStatus;

  @Column({ type: 'varchar', length: 20, nullable: true })
  card!: string | null;

  @Column('text')
  description!: string;

  @Column()
  amount!: number;

  @Column({ type: 'timestamptz' })
  createdAt!: Date | null;

  @BeforeInsert()
  setId() {
    this.id = generateId();
  }
}
