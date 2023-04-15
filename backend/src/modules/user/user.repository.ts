import { Provider } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { DATA_SOURCE } from '../../config/constants.js';

export class UserRepository extends Repository<User> {}

export const userRepositoryProvider: Provider = {
  provide: UserRepository,
  useFactory: (source: DataSource) => source.getRepository(User),
  inject: [DATA_SOURCE],
};
