import { Router } from "express";
import { auth } from "../middleware/auth.js"
import { createProduct, getProducts } from "../controllers/productController.js";

const router = Router()

router.get("/products", getProducts)
router.post("/new-product", auth, createProduct)
// router.post("/delete-product", )

export default router