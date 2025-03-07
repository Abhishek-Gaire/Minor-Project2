import Dashboard from "../pages/Dashboard/Dashboard.tsx";
import Students from "../pages/Dashboard/Students.tsx";
import Courses from "../pages/Dashboard/Courses.tsx";
import Assignments from "../pages/Dashboard/Assignments.tsx";
import ClassChatPage from "../pages/Dashboard/ClaasChat.tsx";
import MessagesPage from "../pages/Dashboard/Messages.tsx";
import OnlineClassPage from "../pages/Dashboard/OnlineClass.tsx";
import Grades from "@/pages/Dashboard/Grades.tsx";

const dashboardRoutes = [
  { index: true, element: <Dashboard /> },
  { path: "students", element: <Students /> },
  { path: "courses", element: <Courses /> },
  { path: "assignments", element: <Assignments /> },
  { path: "chat", element: <ClassChatPage /> },
  { path: "grades", element: <Grades /> },
  { path: "messages", element: <MessagesPage /> },
  { path: "online-class", element: <OnlineClassPage /> },
];

export default dashboardRoutes;
