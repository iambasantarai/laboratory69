import express from "express";
import { Sequelize } from "sequelize";
import { dbConfig, port } from "./utils/env.util.js";

const app = express();

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  database: dbConfig.database,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
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

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
