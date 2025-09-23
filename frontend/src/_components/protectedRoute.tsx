import { useUser } from "@/hooks/userHooks";
import { LoaderCircle } from "lucide-react";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="animate-spin" size={60} />
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}