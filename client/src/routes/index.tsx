import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/Landing/HomePage.tsx";
import AboutPage from "../pages/Landing/AboutPage.tsx";
import ContactPage from "../pages/Landing/ContactPage.tsx";
import FeaturesPage from "../pages/Landing/FeaturesPage.tsx";
import InstitutionSignup from "../pages/Auth/InstitutionSignup";
import Login from "../pages/Auth/Login.tsx";
import RouteNotFound from "../pages/RouteNotFound";
import { MeetingRoom } from "../components/Meetings/MeetingRoom.tsx";
import Layout from "../components/Dashboard/Layout.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Students from "../pages/Dashboard/Students.tsx";
import Courses from "../pages/Dashboard/Courses.tsx";
import Assignments from "../pages/Dashboard/Assignments.tsx";
import ClassChatPage from "../pages/Dashboard/ClsCht.tsx";
import MessagesPage from "../pages/Dashboard/Messages.tsx";
import OnlineClassPage from "../pages/Dashboard/OnlineClass.tsx";

import { AdminLayout } from "../components/Admin/AdminLayout.tsx";
import {
  AdminManagementPage,
  SchoolManagementPage,
} from "@/pages/SuperAdminPages.tsx";
import AdminDashboard, {
  ClassManagementPage,
  TeachersManagementPage,
} from "@/pages/SchoolAdminPages.tsx";
// import SuperAdminAdmins from "@/pages/SuperAdmin/SuperAdminAdmins.tsx";
// import SchoolLayout from "../components/SchoolLayout.tsx";
// import SchoolPage from "../pages/school/SchoolPage.tsx";

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
      { index: true, element: <Dashboard /> },
      { path: ":role", element: <Dashboard /> },
      { path: "students", element: <Students /> },
      { path: "courses", element: <Courses /> },
      { path: "assignments", element: <Assignments /> },
      { path: "chat", element: <ClassChatPage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "online-class", element: <OnlineClassPage /> },
    ],
  },
  {
    path: "/admin1",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      // Add more admin routes here as needed
    ],
  },
  {
    path: "*",
    element: <RouteNotFound />,
  },
  {
    path: "/admin",
    element: <SchoolManagementPage />,
  },
  {
    path: "/admins",
    element: <AdminManagementPage />,
  },
  {
    path: "/teachers",
    element: <TeachersManagementPage />,
  },
  {
    path: "/classes",
    element: <ClassManagementPage />,
  },
  {
    path: "/dashboardAdmin",
    element: <AdminDashboard />,
  },
]);
