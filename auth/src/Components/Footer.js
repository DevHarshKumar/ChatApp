import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container max-w-5xl mx-auto flex justify-between items-center">
        <p className="text-gray-700">&copy; 2024 Your Company. All rights reserved.</p>
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/about" className="text-gray-700 hover:text-gray-900">
              Privacy Policy
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className="text-gray-700 hover:text-gray-900">
              Terms of Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="text-gray-700 hover:text-gray-900">
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
