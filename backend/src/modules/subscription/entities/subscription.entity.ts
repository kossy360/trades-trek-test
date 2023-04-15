import { Column, Entity } from 'typeorm';

@Entity('Subscription')
export class Subscription {
  @Column({ length: 50, primary: true })
  id!: string;

  @Column('text')
  name!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'float' })
  price!: number;

  @Column({ type: 'integer' })
  duration!: number;
}
