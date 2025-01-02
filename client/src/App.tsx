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

export default function App() {
  return (
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
  );
}
