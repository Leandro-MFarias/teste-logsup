import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRoles, useUpdateUserRole, useUser } from "@/hooks/userHooks";
import type { User } from "@/types/user";
import axios from "axios";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";

export function ActionsUserCell({ user }: { user: User }) {
  const { data: roles, isLoading } = useRoles();
  const { mutateAsync: updateRole } = useUpdateUserRole();
  const { data: loggedUser } = useUser();

  if (isLoading) return <div>Carregando...</div>;

  async function handleChangeRole(role: string) {
    if (loggedUser?.role !== "ADMIN") {
      toast.error("Apenas administradores podem alterar cargos!");
      return;
    }

    try {
      await updateRole({ userId: user.id, role });
      toast.success("Cargo atualizado!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error?.response?.data?.message || "Erro ao atualizar cargo",
        );
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={loggedUser?.role !== "ADMIN"}>
        <SquarePen
          className={`${loggedUser.role !== "ADMIN" ? "text-muted-foreground" : "text-white transition duration-150 hover:scale-105"}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Cargos</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((role: string) => (
          <DropdownMenuItem key={role} onClick={() => handleChangeRole(role)}>
            {role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
