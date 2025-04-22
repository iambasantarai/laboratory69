import express from "express";
import { port } from "./utils/env.util.js";
import sequelize from "./config/sequelize.config.js";

const app = express();

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
