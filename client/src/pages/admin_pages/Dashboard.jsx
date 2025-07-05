import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white">
      {/* Navbar for Recruiter Panel */}
      <div className="shadow py-4 border-b border-gray-600">
        <div className="px-5 flex justify-between items-center">
          <img
            src={assets.logo}
            alt="logo"
            className="invert max-sm:w-32 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome, Osman</p>
            <div className="relative">
              <div
                className="cursor-pointer"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <img
                  src={assets.company_icon}
                  alt="company"
                  className="w-8 border border-gray-700 rounded-full hover:opacity-80 transition-opacity"
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
                      <li className="flex items-center gap-2 py-3 px-4 cursor-pointer pr-10 transition hover:bg-gray-700 rounded-md">
                        Logout <LogOut className="size-3" />
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      {/* Left Panel */}
      <div className="flex items-start">
        {/* Left sidebar with option to add job, manage jobs, view applications */}
        <div className="inline-block min-h-screen border-r-2 border-gray-700">
          <ul>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-800 border-b border-gray-700 ${
                  isActive && "bg-gray-800 border-r-4 border-r-indigo-400"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img src={assets.add_icon} alt="add job" className="invert min-w-4" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-800 border-b border-gray-700 ${
                  isActive && "bg-gray-800 border-r-4 border-r-indigo-400"
                }`
              }
              to={"/dashboard/manage-jobs"}
            >
              <img
                src={assets.home_icon}
                alt="manage jobs"
                className="invert min-w-4"
              />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-800 border-b border-gray-700 ${
                  isActive && "bg-gray-800 border-r-4 borderr--indigo-400"
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img
                src={assets.person_tick_icon}
                alt="view applications"
                className="invert min-w-4"
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
