import { createBrowserRouter } from "react-router-dom";

import  HomePage  from "../pages/HomePage.tsx";
import AboutPage  from "../pages/AboutPage.tsx";
import ContactPage  from "../pages/ContactPage.tsx";
import  FeaturesPage  from "../pages/FeaturesPage.tsx";
import  InstitutionSignup  from "../pages/InstitutionSignup";
import Login  from "../pages/Login.tsx";
import RouteNotFound  from "../pages/RouteNotFound";
// import { Signup } from "../pages/Signup.tsx";
import { MeetingRoom } from "../components/Meetings/MeetingRoom.tsx";
import Layout from "../components/Admin/Layout.tsx";
import Dashboard from "../pages/Dashboard.tsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/features",
    element: <FeaturesPage />,
  },
  {
    path: "/institution-signup",
    element: <InstitutionSignup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/meeting/:meetingId",
    element: <MeetingRoom />,
  },
  {
    path: '/dashboard',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> }, // Default route for /dashboard
      { path:":role", element:<Dashboard/>}
      // { path: 'posts', element: <Posts /> },
      // { path: 'projects', element: <AdminProjects /> },
      // { path: 'tags', element: <TagComponent /> },
      // { path: 'notifications', element :<ContactNotification/>}
    ],
  },
  {
    path: "*",
    element: <RouteNotFound />,
  },
]);
