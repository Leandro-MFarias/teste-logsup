import { SideBar } from "@/components/ui/sidebar";
import { UsersDataTable } from "@/components/ui/users-datatable";

export function UsersPage() {
  return (
    <div className="flex h-screen space-x-10">
      <SideBar />

      <div className="flex w-full px-14 md:h-screen">
        <UsersDataTable />
      </div>
    </div>
  );
}
