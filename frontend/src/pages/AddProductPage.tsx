import { NewProduct } from "@/components/ui/newProduct";
import { SideBar } from "@/components/ui/sidebar";
import { useProduct } from "@/services/product";
import { useParams } from "react-router";

export function AddProductPage() {
  const { id } = useParams();
  const { data: product } = useProduct(id);

  return (
    <div className="flex h-screen space-x-10">
      <SideBar />

      <NewProduct product={product} />
    </div>
  );
}
