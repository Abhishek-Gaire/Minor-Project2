import React, { useState } from "react";
import { Link } from "react-router-dom";
import { School } from "lucide-react";
import { HostMeetingButton } from "../Meetings/HostMeetingButton";

export function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Branding */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <School className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                EduConnect
              </span>
            </Link>
          </div>

          {/* Centered Navigation Links */}
          <div className="hidden sm:flex items-center space-x-8">
            <Link
              to="/features"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right-Aligned Actions */}
          <div className="hidden sm:flex items-center space-x-4">
            <HostMeetingButton />
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-transform duration-200 transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/institution-signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-transform duration-200 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg">
          <div className="flex flex-col space-y-4 px-4 py-2">
            <Link
              to="/features"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Features
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <HostMeetingButton />
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
            <Link
              to="/institution-signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-transform duration-200 transform hover:scale-105 inline-block"
              onClick={toggleMobileMenu}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
