import type { LoginSchema } from "@/types/loginSchema"
import axios from "axios"
import { api } from "./api"
import { useMutation } from "@tanstack/react-query"

export async function signIn(data: LoginSchema) {
  const response = await axios.post(`${api}/login`, data, {
    withCredentials: true,
  })

  return response.data
}

export function useLogin() {
  return useMutation({
    mutationFn: signIn,
  })
}