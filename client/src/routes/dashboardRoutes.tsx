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
import AssignmentDetails from "@/pages/Dashboard/AssignmentDetails";

const dashboardRoutes = [
  { index: true, element: <Dashboard /> },
  // { path: "students", element: <Students /> },
  { path: "courses", element: <Courses /> },
  { path: "assignments", children: [
    { index: true, element: <Assignments /> },
    { path: ":id", element: <AssignmentDetails /> },
  ]},
  { path: "chat", element: <ClassChatPage /> },
  { path: "grades", element: <Grades /> },
  { path: "gradebook", element: <Grades /> },
  { path: "messages", element: <MessagesPage /> },
  { path: "materials", element: <StudyMaterialsPage /> },
  { path: "calendar", element: <CalendarPage /> },
  { path: "resources", element: <StudyMaterialsPage /> },
  // { path: "attendance", element: <TeacherAttendancePage /> },
  { path: "live-classes", element: <OnlineClassPage /> },
  { path: "profile", element: <ProfilePage /> },
];

export default dashboardRoutes;
