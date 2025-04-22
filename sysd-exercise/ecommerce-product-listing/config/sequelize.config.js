import { Sequelize } from "sequelize";
import { dbConfig } from "../utils/env.util.js";

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  database: dbConfig.database,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
});

export default sequelize;
