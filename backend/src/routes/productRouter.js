import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController.js";

const router = Router();

router.get("/products", getProducts);
router.post("/new-product", auth, createProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
