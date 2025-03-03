import HomePage from "../pages/Landing/HomePage.tsx";
import AboutPage from "../pages/Landing/AboutPage.tsx";
import ContactPage from "../pages/Landing/ContactPage.tsx";
import FeaturesPage from "../pages/Landing/FeaturesPage.tsx";
import InstitutionSignup from "../pages/Auth/InstitutionSignup.tsx";
import Login from "../pages/Auth/Login.tsx";
import { MeetingRoom } from "../components/Meetings/MeetingRoom.tsx";

const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/features", element: <FeaturesPage /> },
  { path: "/institution-signup", element: <InstitutionSignup /> },
  { path: "/login", element: <Login /> },
  { path: "/meeting/:meetingId", element: <MeetingRoom /> },
];

export default publicRoutes;
