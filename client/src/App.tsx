// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage.tsx";
import { AboutPage } from "./pages/AboutPage.tsx";
import { ContactPage } from "./pages/ContactPage.tsx";
import { FeaturesPage } from "./pages/FeaturesPage.tsx";
import { InstitutionSignup } from "./pages/InstitutionSignup";
import { Login } from "./pages/Login.tsx";
import { RouteNotFound } from "./pages/RouteNotFound";
import { Signup } from "./pages/Signup.tsx";
import { MeetingRoom } from "./components/Meetings/MeetingRoom.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

export default function App() {
  return (
    <AuthProvider>
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
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/institution-signup" element={<InstitutionSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/meeting/:meetingId" element={<MeetingRoom />} />
          {/*Other Routes*/}
          <Route path="*" element={<RouteNotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
