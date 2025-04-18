import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

export const apiConfig = {
  url: process.env.WEBZ_IO_API_URL as string,
  token: process.env.WEBZ_IO_API_TOKEN as string
};

export const dbConfig = {
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string, 10),
  user: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_NAME as string
};

export const logConfig = {
  dir: process.env.LOG_DIR ?? path.join(__dirname, '..', '..', 'logs'),
  server: {
    level: process.env.LOG_LEVEL ?? 'info',
    logFileName: 'server.log',
    errorFileName: 'server-error.log'
  }
};
