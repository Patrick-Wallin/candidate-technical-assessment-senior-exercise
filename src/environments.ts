import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_POSTGRES_HOST: string = '127.0.0.1';
const DEFAULT_POSTGRES_DEV_DB: string = 'people_movies_dev';
const DEFAULT_POSTGRES_PROD_DB: string = 'people_movies_prod';
const DEFAULT_POSTGRES_USER: string = 'admin';
const DEFAULT_POSTGRES_PASSWORD: string = 'password';
const DEFAULT_ENV: string = 'DEV';
const DEFAULT_PORT: number = 3000;

const processEnvironment: {
  POSTGRES_HOST: string;
  POSTGRES_DEV_DB: string;
  POSTGRES_PROD_DB: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  ENV: string;
  PORT: number;
} = {
  POSTGRES_HOST: process.env.POSTGRES_HOST
    ? process.env.POSTGRES_HOST
    : DEFAULT_POSTGRES_HOST,
  POSTGRES_DEV_DB: process.env.POSTGRES_DEV_DB
    ? process.env.POSTGRES_DEV_DB
    : DEFAULT_POSTGRES_DEV_DB,
  POSTGRES_PROD_DB: process.env.POSTGRES_PROD_DB
    ? process.env.POSTGRES_PROD_DB
    : DEFAULT_POSTGRES_PROD_DB,
  POSTGRES_USER: process.env.POSTGRES_USER
    ? process.env.POSTGRES_USER
    : DEFAULT_POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD
    ? process.env.POSTGRES_PASSWORD
    : DEFAULT_POSTGRES_PASSWORD,
  ENV: process.env.ENV ? process.env.ENV : 'DEV',
  PORT: process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT,
};

export { processEnvironment };
