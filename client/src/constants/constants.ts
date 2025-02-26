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
} from "lucide-react";

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
