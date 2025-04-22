import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 8000;

export const dbConfig = {
  dialect: process.env.DB_TYPE,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
};
