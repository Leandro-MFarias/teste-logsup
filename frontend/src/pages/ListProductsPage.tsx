import { ProducsDataTable } from "@/_components/products-datatable";
import { SideBar } from "@/_components/sidebar";

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
