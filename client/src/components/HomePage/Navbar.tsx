import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { School } from "lucide-react";

import { HostMeetingButton } from "../Meetings/HostMeetingButton";
import { navigation } from "../../constants/constants";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="sticky w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm top-0">
      <nav className="container mx-auto px-6 py-4">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-3 text-black-600 hover:text-bblack-900 hover:font-medium transition-colors ${
                  location.pathname === item.href
                    ? "text-blue-900 font-bold"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right-Aligned Actions */}
          <div className="hidden sm:flex items-center space-x-4">
            <HostMeetingButton
              from="desktopNav"
              className="hidden sm:block lg:block md:hidden"
            />
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white shadow-lg">
            <div className="flex flex-col space-y-4 px-4 py-2">
              {navigation.map((item) => (
                <div key={item.name} className="flex justify-center border-b pb-2">
                  <Link
                    to={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}

              <HostMeetingButton from="mobileNav" />
              <div className="flex justify-center border-b pb-2">
                <Link
                  to="/login"
                  className="text-indigo-500 py-2 rounded-md font-semibold transition-transform duration-200 transform hover:scale-105 inline w-fit"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
              </div>

              <div className="flex justify-center pb-2">
                <Link
                  to="/institution-signup"
                  className="text-indigo-500 py-2 rounded-md font-semibold transition-transform duration-200 transform hover:scale-105 inline w-fit"
                  onClick={toggleMobileMenu}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
