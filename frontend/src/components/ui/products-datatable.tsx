import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "../../types/product";
import { DataTable } from "./datatable";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import { ActionsProductCell } from "./actionsProductCell";
import { useProducts } from "@/services/product";

const columns: ColumnDef<Product>[] = [
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
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const desc = row.getValue("description") as string;
      return <div className="max-w-56 truncate">{desc}</div>;
    },
  },
  {
    accessorKey: "price",
    accessorFn: (row) => Number(row.price),
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Preço
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return <div>{formatPrice(price)}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stock
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number;
      return <button className="pl-10">{stock}</button>;
    },
  },
  {
    id: "creator",
    accessorFn: (row) => row.user?.name,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Criado por
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const creator = row.getValue<string>("creator");
      return <div>{creator}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt") as string);
      return <div>{createdAt.toLocaleDateString("pt-BR")}</div>;
    },
  },
  {
    header: "Ações",
    cell: ({ row }) => <ActionsProductCell product={row.original} />,
  },
];

export function ProducsDataTable() {
  const { data: products } = useProducts();

  return <DataTable columns={columns} data={products} />;
}
