import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: "product",
    timestamps: true,
    underscored: true,
    tableName: "product",
  },
);

export default Product;
