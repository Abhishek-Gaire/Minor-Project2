// import React from "react";
// import { Link } from "react-router-dom";
import { School } from "lucide-react";
import FooterLink from "./Footer/FooterLinks";
import FooterContact from "./Footer/FooterContact";
import FooterNewsLetter from "./Footer/FooterNewsLetter";

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
          <FooterLink />
          <FooterContact />
          <FooterNewsLetter />
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
