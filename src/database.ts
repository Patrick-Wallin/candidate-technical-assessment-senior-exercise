import { processEnvironment } from './environments';
import { Pool } from 'pg';

const client: Pool = new Pool({
  host: processEnvironment.POSTGRES_HOST,
  database:
    processEnvironment.ENV?.trim() === 'DEV'
      ? processEnvironment.POSTGRES_DEV_DB
      : processEnvironment.POSTGRES_PROD_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export default client;
