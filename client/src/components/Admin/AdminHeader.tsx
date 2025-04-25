import { useAdminAuth } from "@/contexts/useAdminAuth";
import { cn } from "@/lib/utils.ts";
import { ChevronLeft, ChevronRight, Menu, LogOut, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

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
  const {adminLogout} = useAdminAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className={cn(
              "px-3 py-1 rounded-full text-white text-sm flex items-center gap-1",
              role === "superadmin" ? "bg-blue-600" : "bg-emerald-600"
            )}
          >
            {role === "superadmin" ? "Super Admin" : "School Admin"}
            <ChevronDown size={16} className={cn(dropdownOpen && "rotate-180", "transition-transform")} />
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              <button
                onClick={() => {
                  adminLogout();
                  setDropdownOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
              {/* Additional dropdown items can be added here */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;