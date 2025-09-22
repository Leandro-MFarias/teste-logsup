import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { User } from "@/types/user";
import { useListUsers } from "@/hooks/userHooks";
import { ActionsUserCell } from "./actionsUserCell";
import { DataTable } from "@/components/ui/datatable";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return <button className="pl-10">{email}</button>;
    },
  },
  {
    accessorKey: "role",
    header: "Cargo",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return <div>{role}</div>;
    },
  },
  {
    header: "Ações",
    cell: ({ row }) => <ActionsUserCell user={row.original} />,
  },
];

export function UsersDataTable() {
  const { data } = useListUsers();

  return <DataTable columns={columns} data={data} />;
}
