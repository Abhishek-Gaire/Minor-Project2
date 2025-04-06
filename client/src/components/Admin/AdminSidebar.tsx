import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils.ts";
import { NavItem } from "@/constants/types.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  adminSidebarItems,
  superadminSidebarItems,
} from "@/constants/constants";

interface AdminSidebarProps {
  role: string;
  sidebarOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ role, sidebarOpen }) => {
  const location = useLocation();

  const [sidebarItems, setSidebarItems] = useState<NavItem[]>([]);
  useEffect(() => {
    if (!role) return;

    if (role === "admin") {
      setSidebarItems(adminSidebarItems);
    } else if (role === "superadmin") {
      setSidebarItems(superadminSidebarItems);
    }
  }, [role]);

  return (
    <nav className="flex-1 py-4 px-2">
      <ul className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.name}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.to}
                      className={cn(
                        "flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors",
                        location.pathname.startsWith(item.to) &&
                          (role === "superadmin"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-emerald-50 text-emerald-600")
                      )}
                    >
                      <div className="flex justify-center items-center">
                        <Icon className="mr-3 h-8 w-7" />
                      </div>
                      <span
                        className={cn(
                          "ml-3 whitespace-nowrap",
                          !sidebarOpen && "hidden"
                        )}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  {!sidebarOpen && (
                    <TooltipContent side="right">{item.name}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AdminSidebar;
