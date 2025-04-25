import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Bell, Menu, User } from "lucide-react";
import { mockNotifications } from "@/constants/constants";
import { cn, getInitials } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Header = ({
  user,
  onLogout,
  setIsSidebarOpen,
  isMobile,
  isSidebarOpen,
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-[hsl(var(--background))] shadow-sm sticky top-0 z-30 border-b border-[hsl(var(--border))]">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] lg:hidden"
          >
            <Menu className={cn("h-5 w-5", isSidebarOpen ? "md:hidden" : "")} />
          </button>
          {!isMobile && (
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="rounded-lg p-2 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hidden lg:block"
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
              <button className="relative rounded-full p-2 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[90vw] sm:w-80 bg-[hsl(var(--background))] border border-[hsl(var(--border))]"
            >
              {mockNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="p-3 hover:bg-[hsl(var(--muted))]"
                >
                  <div>
                    <p className="font-medium text-sm text-[hsl(var(--foreground))]">
                      {notification.title}
                    </p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {notification.message}
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
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
              <button className="h-8 w-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center hover:bg-[hsl(var(--accent))] transition-colors">
                <span className="text-sm font-medium text-[hsl(var(--secondary-foreground))]">
                  {getInitials(user.name)}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 cursor-pointer bg-[hsl(var(--background))] border border-[hsl(var(--border))]"
            >
              <DropdownMenuItem
                className="p-2 hover:bg-[hsl(var(--muted))]"
                onClick={() => navigate(`/dashboard/${user?.role}/profile`)}
              >
                <User className="h-4 w-4 mr-2 text-[hsl(var(--muted-foreground))]" />
                <span className="text-[hsl(var(--foreground))]">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="p-2 text-red-600 hover:bg-[hsl(var(--muted))]"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
