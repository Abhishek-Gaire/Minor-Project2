import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth.ts";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, refreshAuth } = useAuth();

  useEffect(() => {
    refreshAuth();
  }, []);
  
  // Only redirect if we're not loading AND there's no user
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }
// Show loading state while verifying authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }


  return <>{children}</>;
};

export default ProtectedRoute;