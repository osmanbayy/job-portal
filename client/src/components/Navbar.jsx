import React from "react";
import { assets } from "../assets/assets";
import { ChevronDown, LogIn, ShieldCheck } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed top-3 left-1/2 transform -translate-x-1/2 w-[90%] max-w-7xl mx-auto rounded-full border border-gray-700 py-2 bg-light shadow-md z-50 font-semibold">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <img
          src={assets.logo}
          alt="logo"
          className="invert h-6 sm:h-8 cursor-pointer hover:invert-75 transition-all"
        />

        <div className="flex items-center gap-4 sm:gap-6 text-gray-300 font-outfit max-md:hidden">
          <a
            href="#"
            className="hidden sm:inline-block text-sm sm:text-base hover:text-gray-500 transition-colors"
          >
            Home
          </a>
          {/* Menu Item with Dropdown */}
          <a
            href="#"
            className="relative group flex items-center gap-1 text-sm sm:text-base hover:text-gray-200 transition-colors"
          >
            <span className="flex items-center gap-1">
              Jobs{" "}
              <ChevronDown className="transition-transform duration-300 group-hover:rotate-180" />
            </span>

            <div
              className="absolute left-0 top-full mt-2 w-52 font-normal bg-gray-900/70 border border-gray-700 rounded-xl shadow inset-shadow-xs shadow-pink-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-40"
            >
              <ul className="flex flex-col text-gray-300">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-800 rounded-lg hover:text-white transition-colors"
                  >
                    Frontend Developer
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-800 rounded-lg hover:text-white transition-colors"
                  >
                    Backend Developer
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-800 rounded-lg hover:text-white transition-colors"
                  >
                    UI/UX Designer
                  </a>
                </li>
              </ul>
            </div>
          </a>

          <a
            href="#"
            className="hidden sm:inline-block text-sm sm:text-base hover:text-gray-500 transition-colors"
          >
            About Us
          </a>
          <a
            href="#"
            className="hidden sm:inline-block text-sm sm:text-base hover:text-gray-500 transition-colors"
          >
            Contact Us
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
          <button className="max-md:hidden flex items-center gap-3 text-gray-300 whitespace-nowrap px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-gray-700 hover:bg-gray-800 hover:text-white transition-all cursor-pointer">
            Recruiter Login <ShieldCheck className="size-4" />
          </button>
          <button className="flex items-center gap-3 bg-gray-800 hover:bg-transparent border border-transparent cursor-pointer hover:border-gray-700 transition-all text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full whitespace-nowrap">
            Login <LogIn className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
