import { ProtectedRoute } from "@/_components/protectedRoute";
import { AddProductPage } from "@/pages/AddProductPage";
import { ListProductsPage } from "@/pages/ListProductsPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { UsersPage } from "@/pages/UsersPage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/list-products",
        element: <ListProductsPage />,
      },
      {
        path: "/new-product/:id?",
        element: <AddProductPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
