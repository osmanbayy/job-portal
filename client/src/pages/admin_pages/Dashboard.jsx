/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { LogOut, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useEffect } from "react";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Function to handle logout
  const handleLogout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  };

  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-jobs");
    }
  }, [companyData]);

  return (
    <div className="min-h-screen dark:text-white">
      {/* Navbar for Recruiter Panel */}
      <div className="shadow py-4 border-b border-gray-300 dark:border-gray-600">
        <div className="px-5 flex justify-between items-center">
          <img
            src={assets.logo}
            alt="logo"
            className="dark:invert max-sm:w-32 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <div className="flex items-center gap-4">
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
            {companyData && (
              <div className="flex items-center gap-3">
                <p className="max-sm:hidden">Welcome, {companyData.name}</p>
                <div className="relative">
                  <div
                    className="cursor-pointer"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <img
                      src={companyData.image || assets.company_icon}
                      alt="company"
                      className="w-8 h-8 border border-gray-700 rounded-full hover:opacity-80 transition-opacity"
                    />
                  </div>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        className="absolute top-0 right-0 text-white/80 rounded pt-12"
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: { duration: 0.2, ease: "easeOut" },
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.95,
                          y: -10,
                          transition: { duration: 0.15, ease: "easeIn" },
                        }}
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                      >
                        <ul className="w-32 list-none m-0 p-0 bg-gray-900 rounded-md border border-gray-700 text-sm">
                          <li onClick={handleLogout} className="flex items-center gap-2 py-3 px-4 cursor-pointer pr-10 transition hover:bg-gray-700 rounded-md">
                            Logout <LogOut className="size-3" />
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Left Panel */}
      <div className="flex items-start">
        {/* Left sidebar with option to add job, manage jobs, view applications */}
        <div className="inline-block min-h-screen border-r-2 dark:border-gray-700 border-gray-300">
          <ul>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full dark:hover:bg-gray-800 hover:bg-gray-400 border-b dark:border-gray-700 border-gray-400 ${
                  isActive &&
                  "dark:bg-gray-800 bg-gray-400 border-r-4 border-r-indigo-400"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img
                src={assets.add_icon}
                alt="add job"
                className="dark:invert min-w-4"
              />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full dark:hover:bg-gray-800 hover:bg-gray-400 border-b dark:border-gray-700 border-gray-400 ${
                  isActive &&
                  "dark:bg-gray-800 bg-gray-400 border-r-4 border-r-indigo-400"
                }`
              }
              to={"/dashboard/manage-jobs"}
            >
              <img
                src={assets.home_icon}
                alt="manage jobs"
                className="dark:invert min-w-4"
              />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full dark:hover:bg-gray-800 hover:bg-gray-400 border-b dark:border-gray-700 border-gray-400 ${
                  isActive &&
                  "dark:bg-gray-800 bg-gray-400 border-r-4 border-r-indigo-400"
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img
                src={assets.person_tick_icon}
                alt="view applications"
                className="dark:invert min-w-4"
              />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
