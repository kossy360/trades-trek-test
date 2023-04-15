import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const typeormClient = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.cwd() + '/../**/*.entity.js'],
});
