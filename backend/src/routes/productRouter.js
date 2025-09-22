import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", auth, createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct)

export default router;
