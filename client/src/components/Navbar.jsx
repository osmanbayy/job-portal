import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ChevronDown, LogIn, ShieldCheck } from "lucide-react";
import { JobCategories } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <div className="navbar backdrop-blur-lg">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <img
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
          src={assets.logo}
          alt="logo"
          className="invert h-6 sm:h-8 cursor-pointer hover:invert-75 transition-all"
        />

        <div className="flex items-center gap-4 sm:gap-6 text-gray-300 font-outfit max-md:hidden">
          <Link
            to="/"
            onClick={() => scrollTo(0, 0)}
            className="hidden sm:inline-block text-sm sm:text-base hover:text-gray-500 transition-colors"
          >
            Home
          </Link>
          {/* Menu Item with Dropdown */}
          <div className="relative group flex items-center gap-1 text-sm sm:text-base hover:text-gray-200 transition-colors">
            <span className="flex items-center gap-1">
              Jobs{" "}
              <ChevronDown className="transition-transform duration-300 group-hover:rotate-180" />
            </span>

            <div className="dropdown-menu">
              <ul className="flex flex-col text-gray-300">
                {JobCategories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-900 hover:tracking-wider rounded-lg hover:text-white transition-all"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            to="/about"
            className="hidden sm:inline-block text-sm sm:text-base hover:text-gray-500 transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hidden sm:inline-block text-sm sm:text-base hover:text-gray-500 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {user ? (
          <div className="text-white/80 flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
            <Link
              to="/applications"
              className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base"
            >
              {" "}
              Applied Jobs
            </Link>
            <p className="invisible md:visible">|</p>
            <p className="max-sm:hidden">Hi! {user.firstName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="max-md:hidden flex items-center gap-3 text-gray-300 whitespace-nowrap px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-gray-700 hover:bg-gray-800 hover:text-white transition-all cursor-pointer"
            >
              Recruiter Login <ShieldCheck className="size-4" />
            </button>
            <button
              onClick={() => openSignIn()}
              className="flex items-center gap-3 bg-indigo-800 hover:bg-transparent border border-transparent cursor-pointer hover:border-gray-700 transition-all text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full whitespace-nowrap"
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
