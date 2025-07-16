import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ChevronDown, LogIn, Moon, ShieldCheck, Sun } from "lucide-react";
import { JobCategories } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const { theme, toggleTheme } = useContext(ThemeContext);
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
          className="dark:invert h-6 sm:h-8 cursor-pointer hover:scale-105 transition-all"
        />

        <div className="text-gray-800 dark:text-gray-300 flex items-center gap-4 sm:gap-6 font-outfit max-md:hidden">
          <Link
            to="/"
            onClick={() => scrollTo(0, 0)}
            className="hidden sm:inline-block text-sm sm:text-base transition-colors hover:text-black/70 dark:hover:text-gray-400"
          >
            Home
          </Link>
          {/* Menu Item with Dropdown */}
          <div className="relative group flex items-center gap-1 text-sm sm:text-base cursor-pointer transition-colors hover:text-black/70 dark:hover:text-gray-400">
            <span className="flex items-center gap-1">
              Jobs{" "}
              <ChevronDown className="transition-transform duration-300 group-hover:rotate-180" />
            </span>

            <div className="dropdown-menu">
              <ul className="flex flex-col dark:text-gray-300">
                {JobCategories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to="#"
                      className="block px-4 py-2 dark:hover:bg-gray-900 hover:bg-gray-300 hover:tracking-wider rounded-lg dark:hover:text-white hover:text-black transition-all"
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
            className="hidden sm:inline-block text-sm sm:text-base hover:text-black/70 dark:hover:text-gray-400 transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hidden sm:inline-block text-sm sm:text-base hover:text-black/70 dark:hover:text-gray-400 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex items-center gap-2">
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
                className="navbar-recruiter-login-btn"
              >
                Recruiter Login <ShieldCheck className="size-4" />
              </button>
              <button
                onClick={() => openSignIn()}
                className="flex items-center gap-3 dark:bg-indigo-800 bg-blue-600 hover:bg-transparent border border-transparent cursor-pointer hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-500 text-white hover:text-black dark:hover:text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full whitespace-nowrap"
              >
                Login <LogIn className="size-4" />
              </button>
            </div>
          )}

          <div className="">
            <button onClick={toggleTheme} className="p-2 cursor-pointer bg-gray-200/50 dark:bg-gray-900 rounded-full dark:hover:bg-gray-800 hover:bg-gray-300 transition">
              {theme === "dark" ? (
                <Sun className="text-white size-4 sm:size-5" />
              ) : (
                <Moon className="text-gray-600 size-4 sm:size-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
