import { Router } from "express";
import productController from "../controllers/product.controller.js";

const router = Router();

router.post("/products", productController.handleCreate);
router.get("/products", productController.handleGet);

export default router;
