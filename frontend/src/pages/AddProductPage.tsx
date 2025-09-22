import { NewProduct } from "@/_components/newProduct";
import { SideBar } from "@/_components/sidebar";
import { useProduct } from "@/hooks/productHooks";
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
