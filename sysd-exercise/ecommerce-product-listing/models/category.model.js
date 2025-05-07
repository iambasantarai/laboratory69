import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

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

export default Category;
