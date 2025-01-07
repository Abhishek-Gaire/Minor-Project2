import { NavLink } from "react-router-dom";
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
  { name: "Dashboard", to: "/", icon: LayoutDashboard },
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
