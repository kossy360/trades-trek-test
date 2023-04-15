import { Module, Provider } from '@nestjs/common';
import { DATA_SOURCE } from '../../config/constants.js';
import { typeormClient } from './typeorm-client.js';

const dbProvider: Provider = {
  provide: DATA_SOURCE,
  useFactory: async () => typeormClient.initialize(),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}
