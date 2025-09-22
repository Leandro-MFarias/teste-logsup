import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as productApi from "@/services/product";
import type { ProductProp } from "@/types/product";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: productApi.fetchProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useProduct(productId?: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => productApi.getProduct(productId!),
    enabled: !!productId,
  });
}

export function useNewProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, data }: ProductProp) =>
      productApi.updateProduct({ productId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productApi.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
