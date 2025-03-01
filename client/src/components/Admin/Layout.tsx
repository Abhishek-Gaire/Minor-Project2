import { Outlet, Navigate } from "react-router-dom";

import { Sidebar } from "../../pages/admin/Sidebar.tsx";
import { Header } from "./Header.tsx";
import { useAuth } from "../../contexts/UseAuth.tsx";

const Layout = () => {
  const { user } = useAuth();

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
};

export default Layout;
