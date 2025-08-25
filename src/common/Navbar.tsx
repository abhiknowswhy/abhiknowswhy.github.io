import React from "react";
import { Link } from "react-router-dom";

export interface NavbarProps {
  logoUrl?: string;
  menuItems: { name: string; path: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ logoUrl, menuItems }) => {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-primary text-white fixed top-0 left-0 z-50">
      <div className="flex items-center">
        {logoUrl && <img src={logoUrl} alt="Logo" className="h-8 mr-2" />}
        <span className="font-bold text-lg">Portfolio</span>
      </div>
      <ul className="hidden md:flex space-x-6">
        {menuItems.map((item, idx) => (
          <li key={idx} className="hover:underline cursor-pointer">
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className="md:hidden">
        {/* Mobile menu icon or dropdown can be added here */}
        <button aria-label="Open menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
