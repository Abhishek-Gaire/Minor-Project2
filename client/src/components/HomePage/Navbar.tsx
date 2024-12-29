import React from "react";
import { Link } from "react-router-dom";
import { School } from "lucide-react";
// import {HostMeetingButton} from "./meetings/HostMeetingButton.tsx"

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="fles items-center">
              <School className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                EduConnect
              </span>
            </Link>
          </div>
          <div className="hidden sm:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>

            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
            <Link
              to="/institution-signup"
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Get Started
            </Link>
            {/* <HostMeetingButton /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
