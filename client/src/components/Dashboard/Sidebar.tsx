import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X as CloseIcon } from "lucide-react";

import { teacherNavigation, studentNavigation } from "@/constants/constants.ts";
import { cn } from "@/lib/utils.ts";

interface SidebarProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  isMobile: boolean;
  role: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  setIsSidebarOpen,
  isMobile,
  role,
}) => {
  const location = useLocation();
  let navItems = role === "student" ? studentNavigation : teacherNavigation;

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[hsl(var(--background))] border-r border-[hsl(var(--border))]">
      <div className="flex h-16 items-center justify-between px-4 bg-[hsl(var(--muted))] border-b border-[hsl(var(--border))]">
        <h1 className="text-xl font-semibold text-[hsl(var(--foreground))]">
          Smart Class
        </h1>
        {!isMobile && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-lg p-1.5 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] lg:hidden"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="p-4 h-full">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center p-3 rounded-lg transition-colors",
                    location.pathname === item.to
                      ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
                      : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]"
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
  );
};
