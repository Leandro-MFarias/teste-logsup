import { NewProduct } from "@/components/ui/newProduct";
import { SideBar } from "@/components/ui/sidebar";

export function AddProductPage() {
  return (
    <div className="flex h-screen space-x-10">
      <SideBar />

      <NewProduct />
    </div>
  );
}
