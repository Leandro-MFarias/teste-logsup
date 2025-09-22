import { ProducsDataTable } from "@/components/ui/products-datatable";
import { SideBar } from "@/components/ui/sidebar";

export function ListProductsPage() {
  return (
    <div className="flex md:h-screen">
      <SideBar />
      <div className="flex w-full px-14 md:h-screen">
        <ProducsDataTable />
      </div>
    </div>
  );
}
