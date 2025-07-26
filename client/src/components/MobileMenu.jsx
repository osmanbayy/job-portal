/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  Briefcase,
  Building2,
  Home,
  SearchIcon,
  Settings,
  X,
} from "lucide-react";
import { assets } from "../assets/assets";

const MobileMenu = ({ mobileMenuOpen, setMobileMenuOpen, user, signOut }) => {
  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-80 max-w-[80vw] bg-gray-200 dark:bg-gray-950 z-50 lg:hidden shadow-2xl border-r border-gray-300 dark:border-gray-700"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <img src={assets.logo} alt="logo" className="dark:invert h-8" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 cursor-pointer bg-gray-200/50 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  <X className="size-5 dark:text-white" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 p-6">
                <nav className="space-y-4">
                  <Link
                    to="/"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollTo(0, 0);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-900 rounded-lg transition-colors"
                  >
                    <Home className="size-4 sm:size-5" />
                    Home
                  </Link>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-gray-800 dark:text-white">
                      <Briefcase className="size-4 sm:size-5" />
                      Find Work
                    </div>
                    <div className="ml-8 space-y-2">
                      <Link
                        to="/all-jobs"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-base text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-900 rounded-lg transition-colors"
                      >
                        <SearchIcon className="size-4" />
                        Find Work
                      </Link>
                      <Link
                        to="/all-jobs"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-base text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-900 rounded-lg transition-colors"
                      >
                        <Bookmark className="size-4" />
                        Saved Works
                      </Link>
                    </div>
                  </div>

                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-900 rounded-lg transition-colors"
                  >
                    <Building2 className="size-4 sm:size-5" />
                    About Us
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-900 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="size-4 sm:size-5" />
                    Settings
                  </Link>
                </nav>
              </div>

              {/* Footer */}
              {user && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={user.imageUrl || assets.profile_img}
                      alt="Profile"
                      className="size-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
                    />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.emailAddresses[0]?.emailAddress}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <X className="size-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
