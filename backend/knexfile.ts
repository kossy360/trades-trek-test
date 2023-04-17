import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

const knexConfig = {
  local: {
    client: 'pg',
    version: '15',
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: join(process.cwd(), 'src/modules/database/migrations'),
    },
  },
};

export default knexConfig;
