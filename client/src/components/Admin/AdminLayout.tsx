import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminLayout = ({ children, role, sidebarItems }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header
        className={cn(
          "h-16 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10",
          role === "superadmin" ? "bg-blue-50" : "bg-gray-50"
        )}
      >
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-200 lg:flex hidden"
          >
            {sidebarOpen ? (
              <ChevronLeft size={24} />
            ) : (
              <ChevronRight size={24} />
            )}
          </button>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-200 lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h1
            className={cn(
              "ml-2 text-xl font-bold",
              role === "superadmin" ? "text-blue-600" : "text-gray-700"
            )}
          >
            {role === "superadmin"
              ? "School Hub Admin"
              : "School Management System"}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Profile and notification icons would go here */}
          <div
            className={cn(
              "px-3 py-1 rounded-full text-white text-sm",
              role === "superadmin" ? "bg-blue-600" : "bg-emerald-600"
            )}
          >
            {role === "superadmin" ? "Super Admin" : "School Admin"}
          </div>
        </div>
      </header>

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
          <nav className="flex-1 py-4 px-2">
            <ul className="space-y-2">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors",
                      item.active &&
                        (role === "superadmin"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-emerald-50 text-emerald-600")
                    )}
                  >
                    <div className="flex justify-center items-center">
                      {item.icon}
                    </div>
                    <span
                      className={cn(
                        "ml-3 whitespace-nowrap",
                        !sidebarOpen && "hidden"
                      )}
                    >
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main
          className={cn(
            "flex-1 p-6 overflow-y-auto transition-all duration-300 mr-16",
            sidebarOpen ? " ml-16" : "ml-16"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

