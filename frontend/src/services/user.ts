import type { LoginSchema } from "@/types/loginSchema";
import { api } from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RegisterSchema } from "@/types/registerSchema";

async function createAccount(data: RegisterSchema) {
  const response = await api.post(`/register`, data);

  return response.data;
}

async function signIn(data: LoginSchema) {
  const response = await api.post(`/login`, data);

  return response.data;
}

export async function logoutService() {
  const response = await api.post("/logout");

  return response.data;
}

export function useRegister() {
  return useMutation({
    mutationFn: createAccount,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: signIn,
  });
}

async function getInfoUser() {
  const response = await api.get("/me");

  return response.data;
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getInfoUser,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: false,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return async () => {
    await logoutService();

    queryClient.removeQueries({
      queryKey: ["user"],
    });
  };
}
