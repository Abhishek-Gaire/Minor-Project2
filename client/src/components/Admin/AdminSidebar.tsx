import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  BarChart,
  Bell,
  Book,
  BookOpen,
  Calendar,
  Clock,
  Database,
  DollarSign,
  FileText,
  Globe,
  GraduationCap,
  Home,
  MessageSquare,
  School,
  Settings,
  Shield,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { NavItem } from "@/constants/types.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminSidebarProps {
  role: string;
  sidebarOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ role, sidebarOpen }) => {
  const location = useLocation();

  const superadminSidebarItems = [
    {
      name: "Dashboard",
      to: `/${role}/dashboard`,
      icon: Home,
    },
    {
      name: "Schools",
      to: `/${role}/schools`,
      icon: School,
    },
    {
      name: "Admins",
      to: `/${role}/schoolAdmins`,
      icon: Shield,
    },
    {
      name: "Reports",
      to: `/${role}/reports`,
      icon: FileText,
    },
    {
      name: "Global Settings",
      to: `/${role}/globalSettings`,
      icon: Globe,
    },
    {
      name: "Analytics",
      to: `/${role}/analytics`,
      icon: BarChart,
    },
    {
      name: "System",
      to: `/${role}/system`,
      icon: Database,
    },
  ];

  const adminSidebarItems = [
    {
      name: "Dashboard",
      to: `/${role}/adminDashboard`,
      icon: Activity,
    },
    {
      name: "Students",
      to: `/${role}/students`,
      icon: GraduationCap,
    },
    {
      name: "Teachers",
      to: `/${role}/teachers`,
      icon: UserCircle,
    },
    {
      name: "Classes",
      to: `/${role}/classes`,
      icon: BookOpen,
    },
    {
      name: "Attendance",
      to: `/${role}/attendance`,
      icon: Clock,
    },
    {
      name: "Payments",
      to: `/${role}/payments`,
      icon: DollarSign,
    },
    {
      name: "Messages",
      to: `/${role}/messages`,
      icon: MessageSquare,
    },
    {
      name: "Courses",
      to: `/${role}/courses`,
      icon: Book,
    },
    {
      name: "Schedule",
      to: `/${role}/schedule`,
      icon: Calendar,
    },
    {
      name: "Notifications",
      to: `/${role}/notifications`,
      icon: Bell,
    },
    {
      name: "Settings",
      to: `/${role}/settings`,
      icon: Settings,
    },
  ];

  const [sidebarItems, setSidebarItems] = useState<NavItem[]>([]);
  useEffect(() => {
    if (!role) return;

    if (role === "admin") {
      setSidebarItems(adminSidebarItems);
    } else if (role === "superadmin") {
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.to}
                      className={cn(
                        "flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors",
                        location.pathname === item.to &&
                          (role === "superadmin"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-emerald-50 text-emerald-600")
                      )}
                    >
                      <div className="flex justify-center items-center">
                        <Icon className="mr-3 h-8 w-7" />
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
                  </TooltipTrigger>
                  {!sidebarOpen && (
                    <TooltipContent side="right">{item.name}</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AdminSidebar;
