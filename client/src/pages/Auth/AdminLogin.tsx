import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

import { useAdminAuth } from "@/contexts/useAdminAuth";
import LoginForm, { LoginFormInputs } from "@/components/Auth/LoginForm";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { admin, adminLogin, refreshAuth } = useAdminAuth();

  useEffect(() => {
    refreshAuth();
  }, []);

  // Redirect if admin is already logged in
  if (admin) {
    return <Navigate to="/admin/adminDashboard" replace />;
  }

  const handleLogin = async (data: LoginFormInputs) => {
    // Use adminLogin function which doesn't require a role
    const { userData, error } = await adminLogin(
      data.email,
      data.password
    );

    if (error) {
      toast.error(error || "Failed to submit the form. Please try again.");
      return;
    }

    toast.success("Admin Login Successful!");
    navigate("/admin/dashboard", { replace: true });
  };

  const goBackHome = () => {
    navigate("/");
  };

  return (
    <div className="relative">
      <div className="absolute top-6 left-6">
        <button 
          onClick={goBackHome}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft className="mr-1" size={20} />
          <span>Go back to home</span>
        </button>
      </div>
      
      <LoginForm 
        onSubmit={handleLogin}
        title="Admin Portal"
        subtitle="Login to manage your school system"
        showForgotPassword={true} 
        showRegisterLink={false}
      />
    </div>
  );
};

export default AdminLogin;