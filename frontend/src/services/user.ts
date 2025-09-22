import type { LoginSchema } from "@/types/loginSchema";
import { api } from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RegisterSchema } from "@/types/registerSchema";

async function createAccount(data: RegisterSchema) {
  const response = await api.post(`/users`, data);

  return response.data;
}

async function signIn(data: LoginSchema) {
  const response = await api.post(`/auth/login`, data);

  return response.data;
}

async function listUsers() {
  const response = await api.get("/users");
  return response.data;
}

async function getInfoUser() {
  const response = await api.get("/users/me");

  return response.data;
}

async function fetchRoles() {
  const response = await api.get("/users/roles");

  return response.data;
}

async function updateUserRoleApi(userId: string, role: string) {
  const response = await api.patch(`/users/${userId}/role`, { role });
  return response.data;
}

export async function logoutService() {
  const response = await api.post("/auth/logout");

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

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getInfoUser,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: false,
  });
}

export function useListUsers() {
  return useQuery({
    queryKey: ["listUsers"],
    queryFn: listUsers,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
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

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      updateUserRoleApi(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listUsers"] });
    },
  });
}
