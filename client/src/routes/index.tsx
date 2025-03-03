import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Dashboard/Layout.tsx";
import AdminLayout from "../components/Admin/AdminLayout.tsx";

import publicRoutes from "./publicRoutes.tsx";
import dashboardRoutes from "./dashboardRoutes.tsx";
import adminRoutes from "./schoolAdminRoutes.tsx";
import superAdminRoutes from "./superAdminRoutes.tsx";

import RouteNotFound from "../pages/RouteNotFound";

export const router = createBrowserRouter([
  ...publicRoutes,
  {
    path: "/dashboard",
    element: <Layout />,
    children: dashboardRoutes,
  },
  {
    path: "/:role",
    element: <AdminLayout />,
    children: [...adminRoutes, ...superAdminRoutes],
  },
  { path: "*", element: <RouteNotFound /> },
]);
