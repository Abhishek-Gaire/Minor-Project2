import Dashboard from "@/pages/Dashboard/Dashboard.tsx";
import Students from "@/pages/Dashboard/Students.tsx";
import Courses from "@/pages/Dashboard/Courses.tsx";
import Assignments from "@/pages/Dashboard/Assignments.tsx";
import ClassChatPage from "@/pages/Dashboard/ClassChat.tsx";
import MessagesPage from "@/pages/Dashboard/Messages.tsx";
import OnlineClassPage from "@/pages/Dashboard/OnlineClass.tsx";
import Grades from "@/pages/Dashboard/Grades.tsx";
import ProfilePage from "@/components/Dashboard/ProfilePage";

const dashboardRoutes = [
  { index: true, element: <Dashboard /> },
  { path: ":role", element: <Dashboard /> },
  { path: "students", element: <Students /> },
  { path: "courses", element: <Courses /> },
  { path: "assignments", element: <Assignments /> },
  { path: "chat", element: <ClassChatPage /> },
  { path: "grades", element: <Grades /> },
  { path: "messages", element: <MessagesPage /> },
  { path: "online-class", element: <OnlineClassPage /> },
  { path: "profile", element: <ProfilePage initialActiveTab="profile" /> },
  {
    path: "settings",
    element: <ProfilePage initialActiveTab="notifications" />,
  },
];

export default dashboardRoutes;
