import React from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="w-36 sm:w-44">
            <img src="/logo.png" alt="Vexor" className="w-full h-auto" />
          </Link>

          <div>
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#9a36ff] hover:bg-[#b87aff] text-white rounded-xl font-medium shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#9a36ff] cursor-pointer"
            >
              Admin Login
              <FaRegArrowAltCircleRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
