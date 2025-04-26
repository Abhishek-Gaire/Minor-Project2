import HomePage from "../pages/Landing/HomePage.tsx";
import AboutPage from "../pages/Landing/AboutPage.tsx";
import ContactPage from "../pages/Landing/ContactPage.tsx";
import FeaturesPage from "../pages/Landing/FeaturesPage.tsx";
import InstitutionSignup from "../pages/Auth/InstitutionSignup.tsx";
import Login from "../pages/Auth/Login.tsx";
import { MeetingRoom } from "../components/Meetings/MeetingRoom.tsx";
import OnlineClassPage from "@/pages/Dashboard/OnlineClass.tsx";
import ResetPassword from "@/pages/Auth/ResetPassword.tsx";
import ForgetPassword from "@/pages/Auth/ForgotPassword.tsx";
import AdminLogin from "@/pages/Auth/AdminLogin.tsx";
import { RegistrationSuccess } from "@/pages/Auth/RegistrationSuccess";
import { SchoolProfile } from "@/pages/Landing/SchoolProfile.tsx";

const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/features", element: <FeaturesPage /> },
  { path: "/institution-signup", element: <InstitutionSignup /> },
  { path: "/login", element: <Login /> },
  { path: "/meeting/:meetingId", element: <MeetingRoom /> },
  { path: "/live-classes", element: <OnlineClassPage /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/forgot-password", element: <ForgetPassword /> },
  { path: "/registration-success/:id", element: <RegistrationSuccess /> },
  {
    path: "/school/:id",
    element: <SchoolProfile />
  },
];

export default publicRoutes;
