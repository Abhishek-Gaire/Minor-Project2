import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext.tsx";

import { Sidebar } from "./Sidebar.tsx";
import { Header } from "./Header.tsx";

export function Layout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
