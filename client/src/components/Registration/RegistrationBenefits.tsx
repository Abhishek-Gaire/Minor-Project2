// import React from 'react';
import { CheckCircle } from "lucide-react";

const benefits = [
  "Comprehensive Learning Management System",
  "Real-time Virtual Classrooms",
  "Advanced Analytics and Reporting",
  "Secure Student Data Management",
  "Integrated Communication Tools",
  "Automated Administrative Tasks",
  "Mobile-friendly Platform",
  "Dedicated Technical Support",
];

export function RegistrationBenefits() {
  return (
    <div className="bg-indigo-50 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Why Choose EduConnect?
      </h2>
      <ul className="space-y-4">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0" />
            <span className="text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
