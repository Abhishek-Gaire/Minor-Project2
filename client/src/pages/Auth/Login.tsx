// src/pages/Login.tsx
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { useAuth } from "@/contexts/useAuth.ts";
import Layout from "@/components/Layout.tsx";
import LoginForm, { LoginFormInputs } from "@/components/Auth/LoginForm.tsx";

const Login = () => {
  const navigate = useNavigate();
  const { user, login, refreshAuth } = useAuth();

  useEffect(() => {
    refreshAuth();
  }, []);

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to={`/dashboard/${user?.role}`} replace />;
  }

  const handleLogin = async (data: LoginFormInputs) => {
    const { userData, error } = await login(
      data.email,
      data.password,
      data.role // This is still required for users
    );

    if (error) {
      toast.error(error || "Failed to submit the form. Please try again.");
      return;
    }

    toast.success("Login Successful!");
    navigate(`/dashboard/${userData?.role}`, { replace: true });
  };

  // Define available roles for the user login page
  const userRoles = [
    { value: "Student", label: "Student" },
    { value: "Teacher", label: "Teacher" }
  ];

  return (
    <Layout>
      <LoginForm 
        onSubmit={handleLogin}
        availableRoles={userRoles}
        showRegisterLink={true}
      />
    </Layout>
  );
};

export default Login;