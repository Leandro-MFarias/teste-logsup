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

export function ActionsCell({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: deleteItem } = useDeleteProduct();
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      if (!product.id) return;
      const response = await deleteItem(product.id);

      toast.success(response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => navigate(`/new-product/${product.id}`)}
          className="text-muted-foreground"
        >
          <SquarePen size={16} />
        </button>
        <button
          onClick={() => setIsOpen(true)}
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
