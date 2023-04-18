import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { AppModule } from './modules/app.module.js';

dotenv.config();

const app = await NestFactory.create(AppModule);

app.use(morgan('dev'));
await app.listen(process.env.PORT as string);
