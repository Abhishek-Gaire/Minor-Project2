import { useState } from "react";
import { toast } from "react-toastify";
import { School, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Layout from "../../components/Layout.tsx";

// Define schema for forget password form
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["Student", "Teacher"], {
    errorMap: () => ({ message: "Please select a role" }),
  }),
});

type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;

const ForgetPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      role: "Student",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    setIsSubmitting(true);
    try {
      // Here you would call your API to send a password reset email
      // const response = await sendPasswordResetEmail(data.email, data.role);
      
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If successful, show success message
      toast.success("Reset link sent to your email!");
      setEmailSent(true);
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error(error?.message || "Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            <p className="mt-2 text-sm text-gray-600">
              {emailSent
                ? "Check your email for the reset link"
                : "Enter your email to reset your password"}
            </p>
          </div>

          {!emailSent ? (
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-gray-600">
                We've sent a password reset link to your email. Please check your inbox and follow the instructions to reset your password.
              </p>
              <button
                onClick={() => setEmailSent(false)}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Try another email
              </button>
            </div>
          )}

          <div className="text-sm text-center mt-4">
            <Link 
              to="/login" 
              className="flex items-center justify-center text-indigo-600 hover:text-indigo-500"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgetPassword;