import { SideBar } from "@/_components/sidebar";
import { UsersDataTable } from "@/_components/users-datatable";

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
