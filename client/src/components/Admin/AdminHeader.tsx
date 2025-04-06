import { cn } from "@/lib/utils.ts";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import React from "react";

interface AdminHeaderProps {
  toggleSidebar: () => void;
  role: string;
  sidebarOpen: boolean;
}
const AdminHeader: React.FC<AdminHeaderProps> = ({
  toggleSidebar,
  role,
  sidebarOpen,
}) => {
  return (
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
          {sidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
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
  );
};

export default AdminHeader;
