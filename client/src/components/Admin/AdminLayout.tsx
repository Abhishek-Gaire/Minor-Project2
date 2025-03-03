import React, { useState } from "react";
import {useParams} from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

import { cn } from "@/lib/utils";
import {Outlet} from "react-router-dom";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { role } = useParams();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <AdminHeader toggleSidebar={toggleSidebar} role={role} sidebarOpen={sidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-white border-r transition-all duration-300 flex flex-col",
            role === "superadmin" ? "border-r-blue-100" : "border-r-gray-200",
            sidebarOpen ? "w-64" : "w-16",
            "fixed h-[calc(100vh-4rem)] top-16 z-10 lg:relative"
          )}
        >
          <AdminSidebar role={role} sidebarOpen={sidebarOpen} />
        </aside>

        {/* Main content */}
        <main
          className={cn(
            "flex-1 p-6 overflow-y-auto transition-all duration-300 mr-16",
            sidebarOpen ? " ml-16" : "ml-16"
          )}
        >
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

