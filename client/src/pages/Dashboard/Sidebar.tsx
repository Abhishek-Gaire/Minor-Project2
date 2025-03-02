import React from "react";
import { Link } from "react-router-dom";
import { X as CloseIcon } from "lucide-react";

import { adminNavigation } from "../../constants/constants";
import { cn } from "../../lib/utils.ts";

interface SidebarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ setIsSidebarOpen }) => {
  return (
    <>
      <div className="flex h-full flex-col overflow-y-auto bg-white">
        <div className="flex h-16 items-center justify-between px-4 bg-blue-100">
          <h1 className="text-xl font-semibold">Smart Class</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 h-full">
          <ul className="space-y-2">
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex items-center p-3 rounded-lg transition-colors",
                      location.pathname === item.to
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon size={20} className="mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};
