import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { isSupervisor } from "../middleware/isSupervisor.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = Router();

router.get("/products", auth, getProducts);
router.get("/products/:id", auth, getProductById);
router.post("/products", auth, createProduct);

router.put("/products/:id", auth, isSupervisor, updateProduct);
router.delete("/products/:id", auth, isSupervisor, deleteProduct);

export default router;
