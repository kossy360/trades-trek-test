import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { JoiExceptionFilter } from './filters/joi-exception.filter.js';

@Global()
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: JoiExceptionFilter,
    },
  ],
})
export class CommonModule {}
