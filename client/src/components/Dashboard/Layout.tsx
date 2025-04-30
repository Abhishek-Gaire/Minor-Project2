import { useEffect, useState } from "react";
import { Outlet,useLocation, useParams } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Sidebar } from "@/components/Dashboard/Sidebar.tsx";
import Header from "./Header.tsx";
import { useAuth } from "@/contexts/useAuth.ts";
import { cn } from "@/lib/utils.ts";
import { useIsMobile } from "@/hooks/use-mobile.ts";
import { ThemeProvider } from "@/contexts/ThemeContext.tsx";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const { user, logout} = useAuth();

  const { role } = useParams();
  const location = useLocation();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <aside
          className={cn(
            "fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out hidden md:block",
            isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-64"
          )}
        >
          <Sidebar
            setIsSidebarOpen={setIsSidebarOpen}
            isMobile={isMobile}
            role={role}
          />
        </aside>

        {/* Sidebar for mobile */}
        <Sheet open={isSidebarOpen && isMobile} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar
              setIsSidebarOpen={setIsSidebarOpen}
              isMobile={isMobile}
              role={role}
            />
          </SheetContent>
        </Sheet>

        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            isSidebarOpen ? "md:ml-64" : "md:ml-0"
          )}
        >
          <Header
            user={user}
            onLogout={logout}
            setIsSidebarOpen={setIsSidebarOpen}
            isMobile={isMobile}
            isSidebarOpen={isSidebarOpen}
          />

          {/* Main Content */}
          <main className="p-4 sm:p-6">
            <div className="animate-fadeIn max-w-[100vw] overflow-x-auto">
              <Suspense fallback={<Loader2 className="animate-spin" />}>
                <Outlet />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
