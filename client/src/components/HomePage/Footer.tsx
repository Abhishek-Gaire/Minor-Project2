import React from "react";
import { Link } from "react-router-dom";
import { School, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <School className="w-8 h-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">
                EduConnect
              </span>
            </div>
            <p className="text-sm">
              Transforming education through technology and innovation
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                info@educonnect.com
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                (+977) 9840000000
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Pokhara,Nepal
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Stau updated with our latest news, articles and resources.
            </p>
            <form action="#" className="space-y-2">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} EduConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
