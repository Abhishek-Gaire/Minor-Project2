import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/useAdminAuth.ts";
import { Loader2 } from "lucide-react";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { admin, loading, refreshAuth } = useAdminAuth();

  // Verify admin authentication on mount
  useEffect(() => {
    refreshAuth();
  }, []);

  // Redirect to login if not authenticated (after loading completes)
  if (!loading && !admin) {
    return <Navigate to="/admin/login" replace />;
  }

  // Show loading state while verifying authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // Render the protected content if authenticated
  return <>{children}</>;
};

export default AdminProtectedRoute;