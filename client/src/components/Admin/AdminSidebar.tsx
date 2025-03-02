import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, GraduationCap, Settings } from "lucide-react";

interface AdminSidebarProps {
  isExpanded: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isExpanded }) => {
  const menuItems = [
    { icon: <Home size={24} />, text: "Dashboard", link: "/admin/dashboard" },
    { icon: <Users size={24} />, text: "Students", link: "/admin/students" },
    {
      icon: <GraduationCap size={24} />,
      text: "Teachers",
      link: "/admin/teachers",
    },
    { icon: <Settings size={24} />, text: "Settings", link: "/admin/settings" },
  ];

  return (
    <aside
      className={`bg-gray-800 text-white h-full fixed top-0 left-0 overflow-y-auto transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <nav className="mt-5">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <Link
                to={item.link}
                className="flex items-center p-2 hover:bg-gray-700"
                title={item.text}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isExpanded && <span className="ml-4">{item.text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
