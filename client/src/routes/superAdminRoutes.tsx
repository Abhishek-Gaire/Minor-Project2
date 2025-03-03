import AdminManagementPage from "@/pages/SuperAdmin/AdminManagementPage";
import GlobalSettingsPage from "@/pages/SuperAdmin/GlobalSettingsPage";
import SchoolManagementPage from "@/pages/SuperAdmin/SchoolManagementPage";
import SystemSettingsPage from "@/pages/SuperAdmin/SystemSettingsPage";
import ReportsPage from "@/pages/SuperAdmin/ReportsPage";
import DashboardPage from "@/pages/SuperAdmin/DashboardPage";
import AnalyticsPage from "@/pages/SuperAdmin/AnalyticsPage";

const superAdminRoutes = [
  { path: "schools", element: <SchoolManagementPage /> },
  { path: "dashboard", element: <DashboardPage /> },
  { path: "schoolAdmins", element: <SchoolManagementPage /> },
  { path: "analytics", element: <AnalyticsPage /> },
  { path: "system", element: <SystemSettingsPage /> },
  { path: "reports", element: <ReportsPage /> },
  { path: "globalSettings", element: <GlobalSettingsPage /> },
];

export default superAdminRoutes;
