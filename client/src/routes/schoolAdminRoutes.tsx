import SchoolAdminStudents from "@/pages/Admin/SchoolAdminStudents.tsx";
// import SchoolAdminMessage from "@/pages/Admin/SchoolAdminMessage.tsx";
import SchoolAdminSettings from "@/pages/Admin/SchoolAdminSettings.tsx";
// import SchoolAdminPayments from "@/pages/Admin/SchoolAdminPayments.tsx";
// import AdminDashboard from "@/pages/Admin/SchoolAdminDashboard.tsx";
import TeachersManagementPage from "@/pages/Admin/Teacher/SchoolAdminTeachers";
import ClassManagementPage from "@/pages/Admin/SchoolAdminClasses.tsx";
import AttendanceManagementPage from "@/pages/Admin/SchoolAdminAttendance.tsx";
// import SchoolAdminCourses from "@/pages/Admin/SchoolAdminCourses.tsx";
// import SchoolAdminSchedule from "@/pages/Admin/SchoolAdminSchedule.tsx";
// import SchoolAdminNotifications from "@/pages/Admin/SchoolAdminNotifications.tsx";
import AdminAddForm from "@/pages/Admin/AdminAddStudents";
import AddTeacherPage from "@/pages/Admin/Teacher/AdminAddTeachers";
import EditTeacherPage from "@/pages/Admin/Teacher/AdminEditTeachers";
import ViewTeacherPage from "@/pages/Admin/Teacher/AdminViewTeachers";


const adminRoutes = [
  { index: true, element: <SchoolAdminStudents /> },
  // { path: "dashboard", element: <AdminDashboard /> },
  {
    path: "teachers",
    children: [
      { index: true, element: <TeachersManagementPage /> },
      { path: "add", element: <AddTeacherPage /> },
      { path: "edit/:id", element: <EditTeacherPage /> },
      { path: "view/:id", element: <ViewTeacherPage /> },
    ],
  },
  { path: "classes", element: <ClassManagementPage /> },
  { path: "attendance", element: <AttendanceManagementPage /> },
  {
    path: "students",
    children: [
      { index: true, element: <SchoolAdminStudents /> },
      { path: "addStudent", element: <AdminAddForm /> },
    ],
  },
  // { path: "messages", element: <SchoolAdminMessage /> },
  // { path: "courses", element: <SchoolAdminCourses /> },
  // { path: "schedule", element: <SchoolAdminSchedule /> },
  // { path: "notifications", element: <SchoolAdminNotifications /> },
  { path: "settings", element: <SchoolAdminSettings /> },
  // { path: "payments", element: <SchoolAdminPayments /> },
];

export default adminRoutes;
