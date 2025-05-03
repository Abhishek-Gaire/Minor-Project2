import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { AdminProvider } from "./contexts/AdminProvider.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster.tsx";
import { Toaster as Sonner } from "@/components/ui/sonner.tsx";
import { Toaster as HotToast } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Toaster />
        <Sonner />
        <HotToast position="top-right" />
        {/* Global Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <RouterProvider router={router} />
      </AdminProvider>
    </AuthProvider>
  );
}
