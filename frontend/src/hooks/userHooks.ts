import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as userApi from "@/services/user";

export function useRegister() {
  return useMutation({
    mutationFn: userApi.createAccount,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: userApi.signIn,
  });
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: userApi.getInfoUser,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: false,
  });
}

export function useListUsers() {
  return useQuery({
    queryKey: ["listUsers"],
    queryFn: userApi.listUsers,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: userApi.fetchRoles,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      userApi.updateUserRoleApi(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listUsers"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return async () => {
    await userApi.logoutService();
    queryClient.removeQueries({ queryKey: ["user"] });
  };
}
