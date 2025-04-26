import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Dashboard/Layout.tsx";
import AdminLayout from "../components/Admin/AdminLayout.tsx";

import publicRoutes from "./publicRoutes.tsx";
import dashboardRoutes from "./dashboardRoutes.tsx";
import adminRoutes from "./schoolAdminRoutes.tsx";
import superAdminRoutes from "./superAdminRoutes.tsx";
import ProtectedRoute from "../components/Dashboard/ProtectedRoute";
import RouteNotFound from "../pages/RouteNotFound";
import AdminProtectedRoute from "@/components/Admin/AdminProtectedRoute.tsx";

export const router = createBrowserRouter(
  [
    ...publicRoutes,
    {
      path: "/dashboard/:role",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: dashboardRoutes,
    },
    {
      path: "/:role",
      element: (
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      ),
      children: [...adminRoutes, ...superAdminRoutes],
    },
    { path: "*", element: <RouteNotFound /> },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // ✅ enables future behavior now
    },
  }
);
