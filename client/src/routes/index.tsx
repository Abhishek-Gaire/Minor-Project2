import { createBrowserRouter } from "react-router-dom";

// Import your components
import HomePage from "../pages/HomePage.tsx";
import AboutPage from "../pages/AboutPage.tsx";
import ContactPage from "../pages/ContactPage.tsx";
import FeaturesPage from "../pages/FeaturesPage.tsx";
import InstitutionSignup from "../pages/InstitutionSignup";
import Login from "../pages/Login.tsx";
import RouteNotFound from "../pages/RouteNotFound";
import { MeetingRoom } from "../components/Meetings/MeetingRoom.tsx";
import Layout from "../components/DashboardS/Layout.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Students from "../pages/Dashboard/Students.tsx";
import Courses from "../pages/Dashboard/Courses.tsx";
import Assignments from "../pages/Dashboard/Assignments.tsx";
import ClassChatPage from "../pages/Dashboard/ClsCht.tsx";
import MessagesPage from "../pages/Dashboard/Messages.tsx";
import OnlineClassPage from "../pages/Dashboard/OnlineClass.tsx";

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
  // {
  //   path: "/admin", // New /school route
  //   element: <AdminLayout />, // SchoolLayout is the layout for all school-related routes
  //   children: [
  //     { index: true, element: <SchoolPage /> }, // Default route for /school
  //     // You can add more school-related routes here as needed
  //     // Example: { path: "details", element: <SchoolDetails /> },
  //   ],
  // },
  {
    path: "*",
    element: <RouteNotFound />,
  },
]);
