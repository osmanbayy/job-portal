/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  ChevronDown,
  Settings,
  User2Icon,
  UserRoundCheck,
  X,
} from "lucide-react";
import { assets } from "../assets/assets";

const UserDropdown = ({ user, openUserProfile, signOut }) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);

  // Check user dropdown open/close
  useEffect(() => {
    const handleClickUserDropdownOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickUserDropdownOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickUserDropdownOutside);
    };
  }, []);

  return (
    <div className="relative" ref={userDropdownRef}>
      <button
        onClick={() => setUserDropdownOpen((prev) => !prev)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <img
          src={user.imageUrl || assets.profile_img}
          alt="Profile"
          className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
        />
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${
            userDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {userDropdownOpen && (
          <motion.div
            key="user-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 top-12 right-0 p-2 dark:bg-gray-950 bg-gray-200 backdrop-blur-xl rounded-xl flex flex-col gap-1 min-w-48 shadow-lg border border-gray-300 dark:border-gray-700"
          >
            <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="font-medium text-sm dark:text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>

            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 text-sm dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setUserDropdownOpen(false)}
            >
              <User2Icon className="size-4 sm:size-5" />
              Profile
            </Link>

            <Link
              to="/applications"
              className="flex items-center gap-3 px-3 py-2 text-sm dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setUserDropdownOpen(false)}
            >
              <BriefcaseBusiness className="size-4 sm:size-5" />
              My Applications
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setUserDropdownOpen(false)}
            >
              <Settings className="size-4 sm:size-5" />
              Settings
            </Link>

            <button
              onClick={() => {
                openUserProfile();
                setUserDropdownOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 text-sm dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors w-full text-left cursor-pointer"
            >
              <UserRoundCheck className="size-4 sm:size-5" />
              Manage Account
            </button>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-1">
              <button
                onClick={() => {
                  signOut();
                  setUserDropdownOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full cursor-pointer"
              >
                <X className="size-4 sm:size-5 text-red-500" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
