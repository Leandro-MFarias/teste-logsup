import type { ProductSchema } from "@/types/productSchema";
import { api } from "./api";
import { useMutation } from "@tanstack/react-query";

async function createProduct(data: ProductSchema) {
  const response = await api.post(`/new-product`, data)

  return response.data
}

export function useNewProduct() {
  return useMutation({
    mutationFn: createProduct
  })
}