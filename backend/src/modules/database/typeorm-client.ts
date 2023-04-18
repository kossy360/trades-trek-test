import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const typeormClient = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.cwd() + '/../**/*.entity.js'],
});
