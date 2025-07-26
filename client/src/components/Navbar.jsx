/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import {
  Bell,
  ChevronDown,
  LogIn,
  Moon,
  Search,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ThemeContext } from "../context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const { openSignIn, openUserProfile, signOut } = useClerk();
  const { user } = useUser();

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { setShowRecruiterLogin } = useContext(AppContext);

  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const loginDropdownRef = useRef(null);

  const [mobileSearchInputIsOpen, setMobileSearchInputIsOpen] = useState(false);
  const mobileSearchInputRef = useRef(null);

  // Check login dropdown open/close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target)
      ) {
        setLoginDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check mobile search dropdown open/close
  useEffect(() => {
    const handleClickSearchBoxOutside = (event) => {
      if (
        mobileSearchInputRef.current &&
        !mobileSearchInputRef.current.contains(event.target)
      ) {
        setMobileSearchInputIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickSearchBoxOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickSearchBoxOutside);
    };
  }, []);

  // Searchbox and toggle theme button
  const SearchAndTheme = (
    <>
      {/* Desktop Search Input */}
      <div className="relative max-xl:hidden">
        <input
          type="text"
          placeholder="Search Work..."
          className="dark:bg-gray-900 bg-gray-200/50 px-4 py-2 rounded-2xl border border-transparent focus:border-gray-300 dark:focus:border-gray-700 outline-none max-sm:hidden dark:text-white text-sm"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-4 dark:text-white" />
      </div>
      {/* Mobile Search Button */}
      <div className="hidden max-xl:flex invisible max-xl:visible">
        <button
          onClick={() => setMobileSearchInputIsOpen((prev) => !prev)}
          className="p-2 cursor-pointer bg-gray-200/50 dark:bg-gray-900 rounded-full dark:hover:bg-gray-800 hover:bg-gray-300 transition"
        >
          <Search className="size-4 md:size-5 dark:text-white" />
        </button>
      </div>
      <div className="">
        <button
          onClick={toggleTheme}
          className="p-2 cursor-pointer bg-gray-200/50 dark:bg-gray-900 rounded-full dark:hover:bg-gray-800 hover:bg-gray-300 transition"
        >
          {theme === "dark" ? (
            <Sun className="text-white size-4 sm:size-5" />
          ) : (
            <Moon className="text-gray-600 size-4 sm:size-5" />
          )}
        </button>
      </div>
    </>
  );

  return (
    <div className="navbar relative backdrop-blur-lg">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <img
            onClick={() => {
              navigate("/");
              scrollTo(0, 0);
            }}
            src={assets.logo}
            alt="logo"
            className="dark:invert h-6 sm:h-8 cursor-pointer hover:scale-105 transition-all"
          />

          <div className="text-gray-800 dark:text-gray-300 flex items-center gap-4 sm:gap-6 font-outfit max-lg:hidden">
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
                Find Work{" "}
                <ChevronDown className="transition-transform duration-300 group-hover:rotate-180" />
              </span>

              <div className="dropdown-menu">
                <ul className="flex flex-col dark:text-gray-300">
                  <li>
                    <Link
                      to="/all-jobs"
                      className="block px-4 py-2 dark:hover:bg-gray-900 hover:bg-gray-300 hover:tracking-wider rounded-xl dark:hover:text-white hover:text-black transition-all"
                    >
                      Find Work
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/all-jobs"
                      className="block px-4 py-2 dark:hover:bg-gray-900 hover:bg-gray-300 hover:tracking-wider rounded-xl dark:hover:text-white hover:text-black transition-all"
                    >
                      Saved Works
                    </Link>
                  </li>
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
              Messages
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="dark:text-white/80 flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
              {SearchAndTheme}
              <div className="">
                <button className="p-2 cursor-pointer bg-gray-200/50 dark:bg-gray-900 rounded-full dark:hover:bg-gray-800 hover:bg-gray-300 transition">
                  <Bell className=" size-4 md:size-5" />
                </button>
              </div>

              <UserDropdown 
                user={user} 
                openUserProfile={openUserProfile} 
                signOut={signOut} 
              />

              <p className="invisible md:visible hidden md:flex">|</p>
              <div className="flex flex-col">
                <p className="max-sm:hidden">Hi! {user.firstName}</p>
                <p className="max-sm:hidden text-sm -mt-1 text-gray-500">$0</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
              {SearchAndTheme}
              {/* Login */}
              <div className="relative">
                <button
                  onClick={() => setLoginDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-3 dark:bg-indigo-800 bg-blue-600 hover:bg-transparent border border-transparent cursor-pointer hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-500 text-white hover:text-black dark:hover:text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full whitespace-nowrap"
                >
                  Login <LogIn className="size-4" />
                </button>

                <AnimatePresence>
                  {loginDropdownOpen && (
                    <motion.div
                      key="login-dropdown"
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.3 }}
                      className="absolute z-20 top-15 p-2 dark:bg-gray-900 bg-gray-100 backdrop-blur-xl right-0 rounded-xl flex flex-col gap-1"
                      ref={loginDropdownRef}
                    >
                      <button
                        onClick={() => setShowRecruiterLogin(true)}
                        className="navbar-recruiter-login-btn w-full"
                      >
                        Recruiter Login <ShieldCheck className="size-4" />
                      </button>
                      <button
                        onClick={() => openSignIn()}
                        className="navbar-recruiter-login-btn w-full"
                      >
                        Freelancer Login <LogIn className="size-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Input */}
      <AnimatePresence>
        {mobileSearchInputIsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="justify-end absolute top-15 w-full hidden max-xl:flex invisible max-xl:visible transition-colors duration-500"
            ref={mobileSearchInputRef}
          >
            <div className="relative max-md:w-full w-1/2">
              <input
                type="text"
                placeholder="Search Work..."
                className="dark:bg-gray-900 bg-zinc-100 px-4 py-2 shadow dark:shadow-white/20 rounded-full border border-gray-300 dark:border-gray-700 outline-none dark:text-white w-full"
              />
              <button className="dark:bg-gray-800 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 p-2 absolute right-1 top-1/2 -translate-y-1/2 ">
                <Search className="size-4 md:size-5 dark:text-white hidden max-xl:flex invisible max-xl:visible" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
