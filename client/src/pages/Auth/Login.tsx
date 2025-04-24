import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { School } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAuth } from "../../contexts/useAuth.ts";
import Layout from "../../components/Layout.tsx";
import { loginSchema } from "../../constants/types.ts";
import { useEffect, useState } from "react";

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { user, login, refreshAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "Student",
    },
  });

  useEffect(() => {
    refreshAuth();
  }, []);

  if (user) {
    return <Navigate to={`/dashboard/${user?.role}`} replace />;
  }

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setIsLoading(true);
      const { userData, error } = await login(
        data.email,
        data.password,
        data.role
      );

      if (error) {
        toast.error(error || "Failed to submit the form. Please try again.");
        return;
      }

      toast.success("Login Successful!");
      navigate(`/dashboard/${userData?.role}`, { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <School className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Smart Class Manager
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select {...register("role")} className="input-field">
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>

                {errors.role && (
                  <p className="text-red-500">{errors.role.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="input-field"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="input-field"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Logging In..." : "Log In"}
              </button>
              <div className="text-sm text-center">
                <span className="font-medium text-indigo-500">
                  Don't have an account? Contact your administrator
                </span>
              </div>
              <div className="text-sm text-center">
                <Link to="/forgot-password">Forget Your Password?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
