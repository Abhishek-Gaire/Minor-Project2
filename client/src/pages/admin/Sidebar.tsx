// components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap, 
  ClipboardList, 
  MessageCircle, 
  MessageSquare, 
  Video 
} from 'lucide-react';

type NavItem = {
  name: string;
  to: string;
  icon: React.ElementType;
};

export const Sidebar: React.FC = () => {
  const navigation: NavItem[] = [
    { name: "Dashboard", to: "/", icon: LayoutDashboard },
    { name: "Students", to: "/students", icon: Users },
    { name: "Courses", to: "/courses", icon: BookOpen },
    { name: "Grades", to: "/grades", icon: GraduationCap },
    { name: "Assignments", to: "/assignments", icon: ClipboardList },
    { name: "Class Chat", to: "/chat", icon: MessageCircle },
    { name: "Messages", to: "/messages", icon: MessageSquare },
    { name: "Online Class", to: "/online-class", icon: Video },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-5 border-b">
        <h1 className="text-xl font-bold">Learning Platform</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink 
                  to={item.to}
                  className={({ isActive }) => 
                    `flex items-center p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon size={20} className="mr-3" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};