// The Data should come from database or API
import {
  BookOpen,
  ClipboardList,
  Clock,
  GraduationCap,
  MessageCircle,
  Shield,
  Users,
  Video,
  LayoutDashboard,
  MessageSquare,
  CalendarCheck,
  Calendar,
  Folder,
  User,
  Home,
  School,
  FileText,
  Globe,
  BarChart,
  Database,
  Activity,
  UserCircle,
  DollarSign,
  Book,
  Bell,
  Settings,
} from "lucide-react";
import { NavItem } from "./types";

export const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b",
    name: "GCES",
    description:
      "A world-renowned institution with centuries of academic excellence and groundbreaking research.",
    location: "Cambridge, United Kingdom",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1562774053-701939374585",
    name: "Stanford University",
    description:
      "Leading innovation and entrepreneurship in the heart of Silicon Valley.",
    location: "Stanford, California",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1700989101224-c4d286d8279a",
    name: "University of Tokyo",
    description:
      "Japan's premier educational institution, blending tradition with cutting-edge research.",
    location: "Tokyo, Japan",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952",
    name: "ETH Zürich",
    description:
      "Excellence in science, technology, and innovation in the heart of Europe.",
    location: "Zürich, Switzerland",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd",
    name: "University of Cape Town",
    description:
      "Africa's leading research university, inspiring minds and transforming lives.",
    location: "Cape Town, South Africa",
  },
];

export const features = [
  {
    icon: BookOpen,
    title: "Interactive Learning",
    description:
      "Engage with course materials through our interactive platform.",
  },
  {
    icon: Video,
    title: "Live Classes",
    description: "Attend virtual classes with real-time interaction.",
  },
  {
    icon: MessageCircle,
    title: "Instant Communication",
    description: "Stay connected with teachers and classmates.",
  },
  {
    icon: ClipboardList,
    title: "Progress Tracking",
    description: "Monitor academic progress with detailed analytics.",
  },
];

export const allFeatures = [
  {
    icon: BookOpen,
    title: "Interactive Learning",
    description:
      "Engage with course materials through our interactive platform designed for optimal learning experiences.",
  },
  {
    icon: Video,
    title: "Live Classes",
    description:
      "Attend virtual classes with real-time interaction between students and teachers.",
  },
  {
    icon: MessageCircle,
    title: "Instant Communication",
    description:
      "Stay connected with teachers and classmates through our integrated messaging system.",
  },
  {
    icon: ClipboardList,
    title: "Progress Tracking",
    description:
      "Monitor academic progress with detailed analytics and performance insights.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description:
      "Work together with classmates on group projects and assignments.",
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning",
    description:
      "Adapt the learning experience to individual student needs and pace.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description: "Access course materials and recorded lectures at any time.",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description:
      "Ensure data privacy and security with our robust protection measures.",
  },
];

export const navigation = [
  { name: "Features", href: "/features" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const teacherNavigation: NavItem[] = [
  {
    name: "Dashboard",
    to: "/dashboard/teacher",
    icon: LayoutDashboard,
  },
  // { name: "My Courses", to: "/dashboard/teacher/courses", icon: BookOpen },
  {
    name: "Gradebook",
    to: "/dashboard/teacher/gradebook",
    icon: GraduationCap,
  },
  {
    name: "Assignments",
    to: "/dashboard/teacher/assignments",
    icon: ClipboardList,
  },
  {
    name: "Attendance",
    to: "/dashboard/teacher/attendance",
    icon: CalendarCheck,
  },
  { name: "Class Chat", to: "/dashboard/teacher/chat", icon: MessageCircle },
  { name: "Live Classes", to: "/dashboard/teacher/live-classes", icon: Video },
  { name: "Calendar", to: "/dashboard/teacher/calendar", icon: Calendar },
  { name: "Resources", to: "/dashboard/teacher/resources", icon: Folder },
  { name: "Profile", to: "/dashboard/teacher/profile", icon: User },
];

export const studentNavigation: NavItem[] = [
  {
    name: "Dashboard",
    to: "/dashboard/student",
    icon: LayoutDashboard,
  },
  // { name: "My Courses", to: "/dashboard/student/courses", icon: BookOpen },
  { name: "Grades", to: "/dashboard/student/grades", icon: GraduationCap },
  {
    name: "Assignments",
    to: "/dashboard/student/assignments",
    icon: ClipboardList,
  },
  { name: "Inbox", to: "/dashboard/student/messages", icon: MessageSquare },
  { name: "Class Chat", to: "/dashboard/student/chat", icon: MessageCircle },
  { name: "Live Classes", to: "/dashboard/student/live-classes", icon: Video },
  { name: "Study Materials", to: "/dashboard/student/materials", icon: Folder },
  { name: "Calendar", to: "/dashboard/student/calendar", icon: Calendar },
  { name: "Profile", to: "/dashboard/student/profile", icon: User },
];
// Mock notifications
export const mockNotifications = [
  {
    id: 1,
    title: "New Student Registration",
    message: "John Doe has registered",
    time: "5 minutes ago",
  },
  {
    id: 2,
    title: "Exam Schedule Updated",
    message: "Mathematics exam rescheduled",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Fee Payment",
    message: "New payment received",
    time: "2 hours ago",
  },
];

export const superadminSidebarItems: NavItem[] = [
  {
    name: "Dashboard",
    to: `/superadmin/dashboard`,
    icon: Home,
  },
  {
    name: "Schools",
    to: `/superadmin/schools`,
    icon: School,
  },
  {
    name: "Admins",
    to: `/superadmin/schoolAdmins`,
    icon: Shield,
  },
  {
    name: "Reports",
    to: `/superadmin/reports`,
    icon: FileText,
  },
  {
    name: "Global Settings",
    to: `/superadmin/globalSettings`,
    icon: Globe,
  },
  {
    name: "Analytics",
    to: `/superadmin/analytics`,
    icon: BarChart,
  },
  {
    name: "System",
    to: `/superadmin/system`,
    icon: Database,
  },
];

export const adminSidebarItems: NavItem[] = [
  {
    name: "Dashboard",
    to: `/admin/adminDashboard`,
    icon: Activity,
  },
  {
    name: "Students",
    to: `/admin/students`,
    icon: GraduationCap,
  },
  {
    name: "Teachers",
    to: `/admin/teachers`,
    icon: UserCircle,
  },
  {
    name: "Classes",
    to: `/admin/classes`,
    icon: BookOpen,
  },
  {
    name: "Attendance",
    to: `/admin/attendance`,
    icon: Clock,
  },
  {
    name: "Payments",
    to: `/admin/payments`,
    icon: DollarSign,
  },
  {
    name: "Messages",
    to: `/admin/messages`,
    icon: MessageSquare,
  },
  {
    name: "Courses",
    to: `/admin/courses`,
    icon: Book,
  },
  {
    name: "Schedule",
    to: `/admin/schedule`,
    icon: Calendar,
  },
  {
    name: "Notifications",
    to: `/admin/notifications`,
    icon: Bell,
  },
  {
    name: "Settings",
    to: `/admin/settings`,
    icon: Settings,
  },
];
