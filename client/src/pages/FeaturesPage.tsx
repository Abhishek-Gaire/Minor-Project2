import React from "react";
import { Navbar } from "../components/HomePage/Navbar";
import { Footer } from "../components/HomePage/Footer";
import {
  BookOpen,
  Video,
  MessageCircle,
  ClipboardList,
  Users,
  GraduationCap,
  Clock,
  Shield,
} from "lucide-react";

const allFeatures = [
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

export function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-to-b from-indigo-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h1>
            <p className="text-xl text-gray-600 max-2-2xl mx-auto">
              Discover all the powerful tools and features that make EduConnect
              the perfect platform for modern education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
