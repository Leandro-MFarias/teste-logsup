import type { ProductSchema } from "@/types/productSchema";
import { api } from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProductProp } from "@/types/product";

async function createProduct(data: ProductSchema) {
  const response = await api.post(`/products`, data);

  return response.data;
}

async function fetchProducts() {
  const response = await api.get("/products");

  return response.data;
}

async function updateProduct({ productId, data }: ProductProp) {
  const response = await api.put(`/products/${productId}`, data);

  return response.data;
}

async function deleteProduct(productId: string) {
  const response = await api.delete(`/products/${productId}`);

  return response.data;
}

async function getProduct(productId: string) {
  const response = await api.get(`/products/${productId}`)

  return response.data
}

export function useProduct(productId?: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId!),
    enabled: !!productId
  })
}

export function useNewProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
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

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({productId, data}: ProductProp) => updateProduct({productId, data}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
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
