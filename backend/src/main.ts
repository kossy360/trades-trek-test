import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module.js';

dotenv.config();

const app = await NestFactory.create(AppModule);

await app.listen(process.env.PORT as string);
