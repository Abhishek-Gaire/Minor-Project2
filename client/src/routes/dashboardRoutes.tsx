import Dashboard from "@/pages/Dashboard/Dashboard.tsx";
import Students from "@/pages/Dashboard/Students.tsx";
import Courses from "@/pages/Dashboard/Courses.tsx";
import Assignments from "@/pages/Dashboard/Assignments.tsx";
import ClassChatPage from "@/pages/Dashboard/ClassChat.tsx";
import MessagesPage from "@/pages/Dashboard/Messages.tsx";
import OnlineClassPage from "@/pages/Dashboard/OnlineClass.tsx";
import Grades from "@/pages/Dashboard/Grades.tsx";
import ProfilePage from "@/pages/Dashboard/ProfilePage";
import StudyMaterialsPage from "@/pages/Dashboard/StudyMaterials";
import CalendarPage from "@/pages/Dashboard/CalendarPage";
import TeacherAttendancePage from "@/pages/Dashboard/AttendancePage";

const dashboardRoutes = [
  { index: true, element: <Dashboard /> },
  { path: "students", element: <Students /> },
  { path: "courses", element: <Courses /> },
  { path: "assignments", element: <Assignments /> },
  { path: "chat", element: <ClassChatPage /> },
  { path: "grades", element: <Grades /> },
  { path: "gradebook", element: <Grades /> },
  { path: "messages", element: <MessagesPage /> },
  { path: "materials", element: <StudyMaterialsPage /> },
  { path: "calendar", element: <CalendarPage /> },
  { path: "resources", element: <MessagesPage /> },
  { path: "attendance", element: <TeacherAttendancePage /> },
  { path: "live-classes", element: <OnlineClassPage /> },
  { path: "profile", element: <ProfilePage /> },
  { path: "settings", element: <ProfilePage /> },
];

export default dashboardRoutes;
