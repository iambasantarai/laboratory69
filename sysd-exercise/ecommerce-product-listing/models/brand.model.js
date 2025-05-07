import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config";
import Product from "./product.model";

class Brand extends Model {}

Brand.init(
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
    modelName: "brand",
    timestamps: true,
    underscored: true,
    tableName: "brand",
  },
);

Brand.hasMany(Product);

export default Brand;
