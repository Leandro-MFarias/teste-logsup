import { AddProductPage } from "@/pages/AddProductPage";
import { ListProductsPage } from "@/pages/ListProductsPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
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
    path: "/list-products",
    element: <ListProductsPage />,
  },
  {
    path: "/new-products",
    element: <AddProductPage />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
