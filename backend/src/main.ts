import dotenv from 'dotenv';

dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module.js';
import path from 'path';

console.log(path.resolve(process.cwd(), '.env'));

console.log(process.env.DATABASE_URL);

const app = await NestFactory.create(AppModule);

await app.listen(process.env.PORT as string);
