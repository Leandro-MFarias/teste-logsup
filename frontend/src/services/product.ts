import type { ProductSchema } from "@/types/productSchema";
import { api } from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function createProduct(data: ProductSchema) {
  const response = await api.post(`/new-product`, data);

  return response.data;
}

async function fetchProducts() {
  const response = await api.get("/products");

  return response.data;
}

async function deleteProduct(productId: string) {
  const response = await api.delete(`/delete-product/${productId}`);

  return response.data;
}

export function useNewProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  });
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
