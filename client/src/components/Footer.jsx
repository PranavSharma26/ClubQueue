import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t p-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-8 text-sm text-gray-700">
        
        {/* Logo and About */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-2xl font-extrabold">
            <span>Club</span>
            <span className="text-[#EE2B69]">Queue</span>
          </div>
          <p className="mt-2 max-w-xs">
            ClubQueue is your college's smart event and club management platform. Simplify events, discover clubs, and stay connected.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold mb-1">Quick Links</h3>
          <Link to="/" className="hover:text-[#EE2B69]">Home</Link>
          <Link to="/clubs" className="hover:text-[#EE2B69]">Clubs</Link>
          <Link to="/about" className="hover:text-[#EE2B69]">About</Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold mb-1">Contact</h3>
          <p>Email: pranavsharma12355@gmail.com</p>
          <p className="text-gray-400">© {new Date().getFullYear()} ClubQueue</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
