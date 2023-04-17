import { Provider, Type } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DATA_SOURCE } from '../../../config/constants.js';

export const provideRepository = (entity: Type<unknown>, repo: Type<Repository<any>>): Provider => {
  return {
    provide: repo,
    inject: [DATA_SOURCE],
    useFactory: (source: DataSource) => source.getRepository(entity),
  };
};
