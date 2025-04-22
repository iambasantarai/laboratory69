import express from "express";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

const sequelize = new Sequelize({
  dialect: process.env.DB_TYPE,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((e) => {
    console.error("Unable to connect to the database:", e);
  });

app.get("/heartbeat", (_req, res) => {
  const hrtime = process.hrtime.bigint();

  res.status(200).json({ heartbeat: hrtime.toString() });
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
