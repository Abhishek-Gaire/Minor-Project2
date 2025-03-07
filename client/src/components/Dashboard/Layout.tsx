import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Sidebar } from "@/pages/Dashboard/Sidebar.tsx";
import Header from "./Header.tsx";
import { useAuth } from "@/contexts/UseAuth.tsx";
import { cn } from "@/lib/utils.ts";
import { useIsMobile } from "@/hooks/use-mobile.ts";
import { SidebarOpen } from "lucide-react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  const location = useLocation();

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]);

  return (
    <div className="min-h-screen bg-gray-100">
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out hidden md:block",
          isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-64"
        )}
      >
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
      </aside>

      {/* Sidebar for mobile */}
      <Sheet open={isSidebarOpen && isMobile} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
        </SheetContent>
      </Sheet>

      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        )}
      >
        <Header
          onLogout={logout}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Main Content */}
        <main className="p-4 sm:p-6 mr-10">
          <div className="animate-fadeIn max-w-[100vw] overflow-x-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
