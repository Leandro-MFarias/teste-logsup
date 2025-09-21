import type { LoginSchema } from "@/types/loginSchema"
import axios from "axios"
import { api } from "./api"
import { useMutation } from "@tanstack/react-query"
import type { RegisterSchema } from "@/types/registerSchema"

async function createAccount(data: RegisterSchema) {
  const response = await axios.post(`${api}/register`, data, {
    withCredentials: true,
  })

  return response.data
}

export function useRegister() {
  return useMutation({
    mutationFn: createAccount,
  })
}

// LOGIN
async function signIn(data: LoginSchema) {
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