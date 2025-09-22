import type { ProductSchema } from "@/types/productSchema";
import { api } from "./api";
import { useMutation, useQuery } from "@tanstack/react-query";

async function createProduct(data: ProductSchema) {
  const response = await api.post(`/new-product`, data);

  return response.data;
}

async function fetchProducts() {
  const response = await api.get("/products");

  return response.data;
}

export function useNewProduct() {
  return useMutation({
    mutationFn: createProduct,
  });
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: false,
  });
}
