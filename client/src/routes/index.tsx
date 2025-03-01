import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage.tsx";
import AboutPage from "../pages/AboutPage.tsx";
import ContactPage from "../pages/ContactPage.tsx";
import FeaturesPage from "../pages/FeaturesPage.tsx";
import InstitutionSignup from "../pages/InstitutionSignup";
import Login from "../pages/Login.tsx";
import RouteNotFound from "../pages/RouteNotFound";
// import { Signup } from "../pages/Signup.tsx";
import { MeetingRoom } from "../components/Meetings/MeetingRoom.tsx";
import Layout from "../components/Admin/Layout.tsx";
import Dashboard from "../pages/admin/Dashboard.tsx";
import Students from "../pages/admin/Students.tsx";
import Courses from "../pages/admin/Courses.tsx";
// import Grades from "../pages/admin/Grades.tsx";
import Assignments from "../pages/admin/Assignments.tsx";
import ClassChatPage from "../pages/admin/ClsCht.tsx";
import MessagesPage from "../pages/admin/Messages.tsx";
import OnlineClassPage from "../pages/admin/OnlineClass.tsx";

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
    path: "/dashboard",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> }, // Default route for /dashboard
      { path: ":role", element: <Dashboard /> },
      { path: "students", element: <Students /> },
      { path: "courses", element: <Courses /> },
      // { path: "grades", element: <Grades /> },
      { path: "assignments", element: <Assignments /> },
      { path: "chat", element: <ClassChatPage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "online-class", element: <OnlineClassPage /> },
    ],
  },
  {
    path: "*",
    element: <RouteNotFound />,
  },
]);
