import {cn} from "@/lib/utils.ts";
import {
    Activity,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Clock,
    DollarSign,
    GraduationCap,
    Menu, MessageSquare, Settings,
    UserCircle
} from "lucide-react";
import React from "react";
const adminSidebarItems = [
    {
        name: "Dashboard",
        href: "/admin",
        icon: <Activity size={20} />,
        active: false,
    },
    {
        name: "Students",
        href: "/admin/students",
        icon: <GraduationCap size={20} />,
        active: false,
    },
    {
        name: "Teachers",
        href: "/admin/teachers",
        icon: <UserCircle size={20} />,
        active: true,
    },
    {
        name: "Classes",
        href: "/admin/classes",
        icon: <BookOpen size={20} />,
        active: false,
    },
    {
        name: "Attendance",
        href: "/admin/attendance",
        icon: <Clock size={20} />,
        active: false,
    },
    {
        name: "Payments",
        href: "/admin/payments",
        icon: <DollarSign size={20} />,
        active: false,
    },
    {
        name: "Messages",
        href: "/admin/messages",
        icon: <MessageSquare size={20} />,
        active: false,
    },
    {
        name: "Settings",
        href: "/admin/settings",
        icon: <Settings size={20} />,
        active: false,
    },
];
const AdminHeader: React.FC<{ toggleSidebar: () => void,role:string,sidebarOpen:boolean }> = ({
  toggleSidebar,role,sidebarOpen
}) => {
  return (
    <header
        className={cn(
            "h-16 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-10",
            role === "superadmin" ? "bg-blue-50" : "bg-gray-50"
        )}
    >
        <div className="flex items-center">
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-200 lg:flex hidden"
            >
                {sidebarOpen ? (
                    <ChevronLeft size={24} />
                ) : (
                    <ChevronRight size={24} />
                )}
            </button>
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-200 lg:hidden"
            >
                <Menu size={24} />
            </button>
            <h1
                className={cn(
                    "ml-2 text-xl font-bold",
                    role === "superadmin" ? "text-blue-600" : "text-gray-700"
                )}
            >
                {role === "superadmin"
                    ? "School Hub Admin"
                    : "School Management System"}
            </h1>
        </div>
        <div className="flex items-center gap-4">
            {/* Profile and notification icons would go here */}
            <div
                className={cn(
                    "px-3 py-1 rounded-full text-white text-sm",
                    role === "superadmin" ? "bg-blue-600" : "bg-emerald-600"
                )}
            >
                {role === "superadmin" ? "Super Admin" : "School Admin"}
            </div>
        </div>
    </header>
  );
};

export default AdminHeader;
