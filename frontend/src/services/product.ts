import type { ProductSchema } from "@/types/productSchema";
import type { ProductProp } from "@/types/product";
import { api } from "./api";

export async function createProduct(data: ProductSchema) {
  const response = await api.post(`/products`, data);
  return response.data;
}

export async function fetchProducts() {
  const response = await api.get("/products");
  return response.data;
}

export async function updateProduct({ productId, data }: ProductProp) {
  const response = await api.put(`/products/${productId}`, data);
  return response.data;
}

export async function deleteProduct(productId: string) {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
}

export async function getProduct(productId: string) {
  const response = await api.get(`/products/${productId}`);
  return response.data;
}