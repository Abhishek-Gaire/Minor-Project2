import React, {useEffect, useState} from "react";
import { Link,useLocation } from "react-router-dom";
import {
  Activity,
  BarChart,
  Bell,
  Book, BookOpen,
  Calendar, Clock, DollarSign,
  FileText,
  Globe, GraduationCap,
  Home, MessageSquare,
  School,
  Settings, UserCircle,
} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {NavItem} from "@/constants/types.ts";

interface AdminSidebarProps {
  role:string,
  sidebarOpen:boolean,
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ role,sidebarOpen }) => {
  const location = useLocation();
  const superadminSidebarItems = [
    {
      name: "Dashboard",
      to: `/${role}/dashboard`,
      icon: Home,
      active: true,
    },
    {
      name: "Schools",
      to: `/${role}/schools`,
      icon: School ,
      active: false,
    },
    {
      name: "Reports",
      to: `/${role}/reports`,
      icon: FileText,
      active: false,
    },
    {
      name: "Global Settings",
      to: `/${role}/globalSettings`,
      icon: Globe,
      active: false,
    },
    {
      name: "Analytics",
      to: `/${role}/analytics`,
      icon: BarChart,
      active: false,
    },
  ];

  const adminSidebarItems = [
    {
      name: "Dashboard",
      to: `/${role}/dashboard`,
      icon: Activity,
      active: true,
    },
    {
      name: "Students",
      to: `/${role}/students`,
      icon: GraduationCap,
      active: false,
    },
    {
      name: "Teachers",
      to: `/${role}/teachers`,
      icon: UserCircle,
      active: false,
    },
    {
      name: "Classes",
      to: `/${role}/classes`,
      icon: BookOpen,
      active: false,
    },
    {
      name: "Attendance",
      to: `/${role}/attendance`,
      icon: Clock,
      active: false,
    },
    {
      name: "Payments",
      to: `/${role}/payments`,
      icon: DollarSign,
      active: false,
    },
    {
      name: "Messages",
      to: `/${role}/messages`,
      icon: MessageSquare,
      active: false,
    },
    {
      name: "Courses",
      to: `/${role}/courses`,
      icon: Book,
      active: false,
    },
    {
      name: "Schedule",
      to: `/${role}/schedule`,
      icon: Calendar,
      active: false,
    },
    {
      name: "Notifications",
      to: `/${role}/notifications`,
      icon: Bell,
      active: false
    },
    {
      name: "Settings",
      to: `/${role}/settings`,
      icon: Settings,
      active: false,
    },
  ]

  const [sidebarItems, setSidebarItems] = useState<NavItem[]>([]);
  useEffect(() => {
    if (!role) return;

    if (role === "admin") {
      setSidebarItems(adminSidebarItems);
    } else {
      setSidebarItems(superadminSidebarItems);
    }
  }, [role]);

  return (
      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors",
                      location.pathname === item.to &&
                      (role === "superadmin"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-emerald-50 text-emerald-600")
                  )}>
                    <div className="flex justify-center items-center">
                      <Icon className="mr-3 h-8 w-7"/>
                    </div>
                    <span
                        className={cn(
                            "ml-3 whitespace-nowrap",
                            !sidebarOpen && "hidden"
                        )}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
  );
};

export default AdminSidebar;
