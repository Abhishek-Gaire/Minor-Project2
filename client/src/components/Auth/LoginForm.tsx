// src/components/forms/LoginForm.tsx
import { toast } from "react-toastify";
import { School } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Updated schema to make role optional
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().optional(),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => Promise<void>;
  availableRoles?: { value: string; label: string }[];
  title?: string;
  subtitle?: string;
  showForgotPassword?: boolean;
  showRegisterLink?: boolean;
  registerLinkText?: string;
  registerLinkAction?: () => void;
}

const LoginForm = ({
  onSubmit,
  availableRoles,
  title = "Smart Class Manager",
  subtitle,
  showForgotPassword = true,
  showRegisterLink = false,
  registerLinkText = "Don't have an account? Contact your administrator",
  registerLinkAction,
}: LoginFormProps) => {
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
      role: availableRoles?.[0]?.value,
    },
  });

  const handleFormSubmit = async (data: LoginFormInputs) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <School className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            {availableRoles && availableRoles.length > 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select {...register("role")} className="input-field">
                  {availableRoles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-red-500">{errors.role.message}</p>
                )}
              </div>
            )}
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
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </button>
            
            {showRegisterLink && (
              <div className="text-sm text-center">
                <span 
                  className="font-medium text-indigo-500 cursor-pointer"
                  onClick={registerLinkAction}
                >
                  {registerLinkText}
                </span>
              </div>
            )}
            
            {showForgotPassword && (
              <div className="text-sm text-center">
                <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;