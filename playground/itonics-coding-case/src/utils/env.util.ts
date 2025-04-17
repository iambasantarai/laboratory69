import dotenv from 'dotenv';

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
