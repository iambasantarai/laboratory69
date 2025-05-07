import {
  randBrand,
  randFloat,
  randProductCategory,
  randProductDescription,
  randProductName,
} from "@ngneat/falso";
import Category from "../models/category.model.js";
import Brand from "../models/brand.model.js";
import Product from "../models/product.model.js";

async function create() {
  const randomBrandName = randBrand();
  const brand = await Brand.create({
    systemName: randomBrandName.toLowerCase(),
    displayName: randomBrandName,
  });

  const randomCategoryName = randProductCategory();
  const category = await Category.create({
    systemName: randomCategoryName.toLowerCase(),
    displayName: randomCategoryName,
  });

  const product = await Product.create({
    name: randProductName(),
    description: randProductDescription(),
    price: randFloat(),
    brandId: brand.id,
    categoryId: category.id,
  });

  return product;
}

async function get() {
  const products = await Product.findAll({
    include: [Brand, Category],
  });

  return products;
}

export default {
  create,
  get,
};
