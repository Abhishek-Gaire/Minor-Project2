import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Bell, Menu, User, Settings } from "lucide-react";

import { mockNotifications } from "@/constants/constants";

const Header = ({ onLogout, setIsSidebarOpen, isMobile }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          {!isMobile && (
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hidden lg:block"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[90vw] sm:w-80">
              {mockNotifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-3">
                  <div>
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-sm text-gray-500">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 rounded-full bg-school-100 flex items-center justify-center hover:bg-school-200 transition-colors">
                <span className="text-sm font-medium text-school-700">JD</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="p-2">
                <User className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2">
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                <span onClick={onLogout}>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
