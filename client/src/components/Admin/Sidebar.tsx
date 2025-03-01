import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  ClipboardList,
  MessageCircle,
  MessageSquare,
  Video,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { name: "Students", to: "/students", icon: Users },
  { name: "Courses", to: "/courses", icon: BookOpen },
  { name: "Grades", to: "/grades", icon: GraduationCap },
  { name: "Assignments", to: "/assignments", icon: ClipboardList },
  { name: "Class Chat", to: "/chat", icon: MessageCircle },
  { name: "Messages", to: "/messages", icon: MessageSquare },
  { name: "Online Class", to: "/online-class", icon: Video },
];

export function Sidebar() {
  return (
    <nav className="w-64 bg-white shadow-sm">
      <div className="h-full px-3 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({
                    isActive,
                  }) => `flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

const SidebarContent = () => (
  <div className="flex h-full w-full flex-col overflow-y-auto bg-white">
    <div className="flex h-16 items-center justify-between px-4 bg-school-50">
      <h1 className="text-xl font-semibold text-school-900">SchoolAdmin</h1>
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden"
      >
        <CloseIcon className="h-5 w-5" />
      </button>
    </div>

    <nav className="flex-1 space-y-1 px-2 py-4">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={cn(
            "flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
            location.pathname === item.path
              ? "bg-school-50 text-school-700"
              : "text-gray-600 hover:bg-school-50 hover:text-school-700"
          )}
          onClick={() => isMobile && setIsSidebarOpen(false)}
        >
          <item.icon className="h-5 w-5 mr-3" />
          {item.label}
        </Link>
      ))}
    </nav>
  </div>
);
