import { Router } from "express";
import { auth } from "../middleware/auth.js"
import { createProduct } from "../controllers/productController.js";

const router = Router()

// router.get("/products", )
router.post("/new-product", auth, createProduct)
// router.post("/delete-product", )

export default router