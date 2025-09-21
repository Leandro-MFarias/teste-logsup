import * as productService from "../services/productService.js"

export async function createProduct(req, res) {
  try {
    const result = await productService.createProduct(req.body, req.userId)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}