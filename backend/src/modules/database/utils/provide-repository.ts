import { Provider, Type } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DATA_SOURCE } from '../../../config/constants.js';

export const provideRepository = (...repos: Type<Repository<any>>[]): Provider[] => {
  return repos.map((repo) => ({
    provide: repo,
    inject: [DATA_SOURCE],
    useFactory: (source: DataSource) => source.getRepository(repo),
  }));
};
