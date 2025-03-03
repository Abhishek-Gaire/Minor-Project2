import SchoolAdminStudents from "@/pages/Admin/SchoolAdminStudents.tsx";
import SchoolAdminMessage from "@/pages/Admin/SchoolAdminMessage.tsx";
import SchoolAdminSettings from "@/pages/Admin/SchoolAdminSettings.tsx";
import SchoolAdminPayments from "@/pages/Admin/SchoolAdminPayments.tsx";
import AdminDashboard from "@/pages/Admin/SchoolAdminDashboard.tsx";
import { TeachersManagementPage } from "@/pages/Admin/SchoolAdminTeachers.tsx";
import { ClassManagementPage } from "@/pages/Admin/SchoolAdminClasses.tsx";
import { AttendanceManagementPage } from "@/pages/Admin/SchoolAdminAttendance.tsx";
import SchoolAdminCourses from "@/pages/Admin/SchoolAdminCourses.tsx";
import SchoolAdminSchedule from "@/pages/Admin/SchoolAdminSchedule.tsx";
import SchoolAdminNotifications from "@/pages/Admin/SchoolAdminNotifications.tsx";

const adminRoutes = [
  { index: true, element: <AdminDashboard /> },
  { path: "adminDashboard", element: <AdminDashboard /> },
  { path: "teachers", element: <TeachersManagementPage /> },
  { path: "classes", element: <ClassManagementPage /> },
  { path: "attendance", element: <AttendanceManagementPage /> },
  { path: "students", element: <SchoolAdminStudents /> },
  { path: "messages", element: <SchoolAdminMessage /> },
  { path: "courses", element: <SchoolAdminCourses /> },
  { path: "schedule", element: <SchoolAdminSchedule /> },
  { path: "notifications", element: <SchoolAdminNotifications /> },
  { path: "settings", element: <SchoolAdminSettings /> },
  { path: "payments", element: <SchoolAdminPayments /> },
];

export default adminRoutes;
