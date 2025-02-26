import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { School } from "lucide-react";
import {useAuth} from "../contexts/UseAuth.tsx";

import Layout from "../components/Layout.tsx";

const Login =() => {
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
    role: "Student" | "Teacher";
  }>({
    email: "",
    password: "",
    role: "Student", // Correctly define as union type
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to={`/dashboard/${user?.role}`} replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!loginData.role) {
      toast.error("Role is required.");
      setLoading(false);
      return;
    }

    try {
     const {error} = await login(loginData.email, loginData.password,loginData.role);

      if (error) {
        setError(
            error || "Failed to submit the form. Please try again."
        );
        toast.error(
          error || "Failed to submit the form. Please try again."
        );
        return;
      }

      toast.success("Login Successful!");
      navigate("/dashboard", { replace: true });
    } catch (error:Error | any) {
      console.error("Login error:", error);
      setError(
        error || "An unexpected error occurred."
      );
      toast.error(`error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <School className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              School Management System
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  value={loginData.role}
                  onChange={(e) =>
                    setLoginData({ ...loginData, role: e.target.value as "Student" | "Teacher" })
                  }
                  className="mt-1 mb-4 mr-1 block w-full rounded-md border border-gray-300 px-6 py-4 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email :e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-6 py-4 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password :e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-6 py-4 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              <div className="text-sm text-center">
                <span className="font-medium text-indigo-500">
                  Don't have an account?
                  <p className=" hover:text-indigo-900">
                    Contact your administrator
                  </p>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
