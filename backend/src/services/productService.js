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

export async function getProductById(productId) {
  const product = await productModel.getProductById(productId);
  
  if (!product) {
    const error = new Error("Produto não encontrado");
    error.status = 404;
    throw error;
  }

  return product;
}

export async function updateProduct(productId, data) {
  const result = await productModel.updateProduct(productId, data);

  if (!result) {
    const error = new Error("Produto não encontrado");
    error.status = 400;
    throw error;
  }

  return { message: "Produto atualizado." };
}

export async function deleteProduct(productId) {
  await productModel.deleteProduct(productId);

  return { message: "Produto Deletado!" };
}
