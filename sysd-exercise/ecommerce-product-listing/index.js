import express from "express";
import { port } from "./utils/env.util.js";
import sequelize from "./config/sequelize.config.js";
import router from "./routes/product.route.js";
import Brand from "./models/brand.model.js";
import Category from "./models/category.model.js";
import Product from "./models/product.model.js";

const app = express();

Brand.hasMany(Product);
Product.Brand = Product.belongsTo(Brand);

Category.hasMany(Product);
Product.Category = Product.belongsTo(Category);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((e) => {
    console.error("Unable to connect to the database:", e);
  });
sequelize
  .sync({ force: true })
  .then(() => {
    app.get("/heartbeat", (_req, res) => {
      const hrtime = process.hrtime.bigint();

      res.status(200).json({ heartbeat: hrtime.toString() });
    });

    app.use(router);

    app.listen(port, () =>
      console.log(`Listening on http://localhost:${port}`),
    );
  })
  .catch((e) => {
    console.error("ERROR: ", e);
  });
