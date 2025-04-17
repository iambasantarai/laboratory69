import dotenv from 'dotenv';

dotenv.config();

export const apiConfig = {
  url: process.env.WEBZ_IO_API_URL as string,
  token: process.env.WEBZ_IO_API_TOKEN as string
};
