import { productSchema } from "../types/productSchema.js";
import * as productModel from "../models/productModel.js";

export async function createProduct(data, userId) {
  const { name, description, price, stock } = productSchema.parse(data);

  await productModel.create({
    name,
    description,
    price,
    stock,
    userId
  });

  return { message: "Produto adicionado!" };
}
