import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

export class UserRepository extends Repository<User> {}
