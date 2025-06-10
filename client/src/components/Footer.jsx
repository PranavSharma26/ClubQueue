import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t p-6 dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-8 text-sm text-gray-700 dark:text-gray-300">
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-2xl font-extrabold text-black dark:text-gray-100">
            <span>Club</span>
            <span className="text-[#EE2B69]">Queue</span>
          </div>
          <p className="mt-2 max-w-xs text-gray-700 dark:text-gray-400">
            ClubQueue is your college's smart event and club management platform. Simplify events, discover clubs, and stay connected.
          </p>
        </div>

        {/* Navigation Links */}
        {/* <div className="flex flex-col gap-1">
          <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-200">Quick Links</h3>
          <Link to="/" className="hover:text-[#EE2B69]">Home</Link>
          <Link to="/profile" className="hover:text-[#EE2B69]">Profile</Link>
          <Link to="/settings" className="hover:text-[#EE2B69]">Settings</Link>
        </div> */}

        {/* Contact */}
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-200">Contact</h3>
          <p>Email: pranavsharma12355@gmail.com</p>
          <p className="text-gray-400 dark:text-gray-500">© {new Date().getFullYear()} ClubQueue</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
