import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config";
import Product from "./product.model";

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    systemName: {
      type: DataTypes.STRING,
    },
    displayName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "category",
    timestamps: true,
    underscored: true,
    tableName: "category",
  },
);

Category.hasMany(Product);

export default Category;
