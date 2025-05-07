import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config";
import Brand from "./brand.model";
import Category from "./category.model";

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

Product.Brand = Product.belongsTo(Brand);
Product.Category = Product.belongsTo(Category);

export default Product;

module.exports = Product;
