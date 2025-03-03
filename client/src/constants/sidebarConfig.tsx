// sidebarConfig.js
import React from 'react';
import {
    Home,
    Users,
    Book,
    Calendar,
    Bell,
    Settings,
    FileText,
    Globe,
    School,
    BarChart
} from 'lucide-react';

export const superadminSidebarItems = [
    {
        name: "Dashboard",
        href: "/superadmin/dashboard",
        icon: <Home size={20} />,
    active: true,
},
{
    name: "Schools",
        href: "/superadmin/schools",
    icon: <School size={20} />,
    active: false,
},
{
    name: "Reports",
        href: "/superadmin/reports",
    icon: <FileText size={20} />,
    active: false,
},
{
    name: "Global Settings",
        href: "/superadmin/settings",
    icon: <Globe size={20} />,
    active: false,
},
{
    name: "Analytics",
        href: "/superadmin/analytics",
    icon: <BarChart size={20} />,
    active: false,
},
];

export const adminSidebarItems = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: <Home size={20} />,
    active: true,
},
{
    name: "Students",
        href: "/admin/students",
    icon: <Users size={20} />,
    active: false,
},
{
    name: "Teachers",
        href: "/admin/teachers",
    icon: <Users size={20} />,
    active: false,
},
{
    name: "Courses",
        href: "/admin/courses",
    icon: <Book size={20} />,
    active: false,
},
{
    name: "Schedule",
        href: "/admin/schedule",
    icon: <Calendar size={20} />,
    active: false,
},
{
    name: "Notifications",
        href: "/admin/notifications",
    icon: <Bell size={20} />,
    active: false,
},
{
    name: "Settings",
        href: "/admin/settings",
    icon: <Settings size={20} />,
    active: false,
},
];