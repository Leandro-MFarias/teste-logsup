import * as productService from "../services/productService.js";

export async function createProduct(req, res) {
  try {
    const result = await productService.createProduct(req.body, req.userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProducts(req, res) {
  try {
    const result = await productService.getProducts();

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status | 500).json({ message: error.message });
  }
}
