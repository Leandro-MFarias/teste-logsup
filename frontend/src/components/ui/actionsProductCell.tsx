import { useDeleteProduct } from "@/services/product";
import type { Product } from "@/types/product";
import { SquarePen, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router";
import { useUser } from "@/services/user";

export function ActionsProductCell({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: deleteItem } = useDeleteProduct();
  const { data: user } = useUser();
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      if (!product.id) return;
      const response = await deleteItem(product.id);

      toast.success(response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  function handleEdit() {
    if (user.role === "ANALISTA") {
      toast.error("Você não é supervisor!");
      return;
    }
    navigate(`/new-product/${product.id}`);
  }

  function handleOpenDelete() {
    if (user.role === "ANALISTA") {
      toast.error("Você não é supervisor!");
      return;
    }
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleEdit}
          className="text-muted-foreground cursor-pointer hover:scale-105"
        >
          <SquarePen size={16} />
        </button>
        <button
          onClick={handleOpenDelete}
          className="cursor-pointer text-red-500 transition hover:scale-105"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
