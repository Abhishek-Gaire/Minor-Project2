// import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Video } from "lucide-react";

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8 flex items-center justify-center space-x-3">
            <GraduationCap size={40} className="text-white" />
            <span>Transform Your Learning Experience</span>
          </h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Connect, learn, and grow with our comprehensive school management
            system. Experience education reimagined for the digital age.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="bg-white text-indigo-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 flex items-center space-x-2"
            >
              <Users size={20} className="text-indigo-600" />
              <span>Get Started</span>
            </Link>
            <Link
              to="#features"
              className="border-2 border-white px-8 py-3 rounded-md font-medium hover:bg-white/10 flex items-center space-x-2"
            >
              <Video size={20} className="text-white" />
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
