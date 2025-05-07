import productService from "../services/product.service.js";

async function handleCreate(_req, res) {
  const product = await productService.create();

  return res.status(201).json({ message: "Product created!", product });
}

async function handleGet(_req, res) {
  const products = await productService.get();

  return res.status(200).json({ message: "Product listed!", products });
}

export default {
  handleCreate,
  handleGet,
};
