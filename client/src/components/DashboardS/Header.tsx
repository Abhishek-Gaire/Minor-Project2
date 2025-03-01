// import { useAuth } from "../contexts/AuthContext";

import { LogOut, Bell } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/UseAuth";

export function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();

    return <Navigate to="/" replace />;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flexitems-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Smart School Manager
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
