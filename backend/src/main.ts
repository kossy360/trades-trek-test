import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module.js';
import morgan from 'morgan';

dotenv.config();

const app = await NestFactory.create(AppModule);

app.use(morgan('dev'));
await app.listen(process.env.PORT as string);
