// components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

import { adminNavigation } from "../../constants/constants";

export const Sidebar: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-white">
      <div className="p-5 border-b">
        <h1 className="text-xl font-bold">Smart Class</h1>
      </div>
      <nav className="p-4 h-full">
        <ul className="space-y-2">
          {adminNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={20} className="mr-3" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
