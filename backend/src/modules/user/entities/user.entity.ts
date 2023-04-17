import { BeforeInsert, Column, Entity } from 'typeorm';
import { generateId } from '../../../common/utils/generate-id.js';

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

  @Column('text', { select: false })
  password?: string;

  @BeforeInsert()
  setId() {
    this.id = generateId();
  }
}
