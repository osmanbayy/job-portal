import React from "react";
import { assets } from "../assets/assets";
import { ChevronDown, LogIn, ShieldCheck } from "lucide-react";
import { JobCategories } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className="navbar">
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

            <div className="dropdown-menu">
              <ul className="flex flex-col text-gray-300">
                {JobCategories.map((category, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-800 rounded-lg hover:text-white transition-colors"
                    >
                      {category}
                    </a>
                  </li>
                ))}
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

        {user ? (
          <div className="text-white/80 flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
            <Link
              to="/applications"
              className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base invisible md:visible"
            >
              {" "}
              Applied Jobs
            </Link>
            <p className="invisible md:visible">|</p>
            <p>Hi! {user.firstName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
            <button className="max-md:hidden flex items-center gap-3 text-gray-300 whitespace-nowrap px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-gray-700 hover:bg-gray-800 hover:text-white transition-all cursor-pointer">
              Recruiter Login <ShieldCheck className="size-4" />
            </button>
            <button
              onClick={() => openSignIn()}
              className="flex items-center gap-3 bg-gray-800 hover:bg-transparent border border-transparent cursor-pointer hover:border-gray-700 transition-all text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full whitespace-nowrap"
            >
              Login <LogIn className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
