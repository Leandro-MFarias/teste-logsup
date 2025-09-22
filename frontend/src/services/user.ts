import type { LoginSchema } from "@/types/loginSchema";
import type { RegisterSchema } from "@/types/registerSchema";
import { api } from "./api";

export async function createAccount(data: RegisterSchema) {
  const response = await api.post(`/users`, data);
  return response.data;
}

export async function signIn(data: LoginSchema) {
  const response = await api.post(`/auth/login`, data);
  return response.data;
}

export async function listUsers() {
  const response = await api.get("/users");
  return response.data;
}

export async function getInfoUser() {
  const response = await api.get("/users/me");
  return response.data;
}

export async function fetchRoles() {
  const response = await api.get("/users/roles");
  return response.data;
}

export async function updateUserRoleApi(userId: string, role: string) {
  const response = await api.patch(`/users/${userId}/role`, { role });
  return response.data;
}

export async function logoutService() {
  const response = await api.post("/auth/logout");
  return response.data;
}
