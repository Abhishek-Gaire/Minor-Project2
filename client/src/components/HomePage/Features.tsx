// import React from "react";
import { BookOpen, Video, MessageCircle, ClipboardList } from "lucide-react";

const features = [
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

export function Features() {
  return (
    <div id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools needed fot effective online
            education.
          </p>
        </div>
        <div className="grid gride-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
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
  );
}
