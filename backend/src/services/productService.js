import { productSchema } from "../types/productSchema.js";
import * as productModel from "../models/productModel.js";

export async function createProduct(data, userId) {
  const { name, description, price, stock } = productSchema.parse(data);

  await productModel.create({
    name,
    description,
    price,
    stock,
    userId,
  });

  return { message: "Produto adicionado!" };
}

export async function getProducts() {
  const result = await productModel.products();

  if (!result) {
    const error = new Error("Erro ao buscar produtos");
    error.status = 400;
    throw error;
  }

  return result;
}
