import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { AdminProvider } from "./contexts/AdminProvider.tsx"; // Import your AdminProvider
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AuthProvider>
      <AdminProvider>
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
