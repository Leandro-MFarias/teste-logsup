import type { LoginSchema } from "@/types/loginSchema";
import { api } from "./api";
import { useMutation } from "@tanstack/react-query";
import type { RegisterSchema } from "@/types/registerSchema";

async function createAccount(data: RegisterSchema) {
  const response = await api.post(`/register`, data);

  return response.data;
}

export function useRegister() {
  return useMutation({
    mutationFn: createAccount,
  });
}

// LOGIN
async function signIn(data: LoginSchema) {
  const response = await api.post(`/login`, data);

  return response.data;
}

export function useLogin() {
  return useMutation({
    mutationFn: signIn,
  });
}
