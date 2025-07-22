/* eslint-disable no-unused-vars */
import React from "react";
import { assets, viewApplicationsPageData } from "../../assets/assets";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const ViewApplications = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.1,
        ease: "easeOut",
        delay: 0.2,
      }}
      className="container mx-auto p-4"
    >
      <div>
        <table className="w-full max-w-4xl dark:bg-gray-900 bg-gray-200 border dark:border-gray-700 border-gray-300 max-sm:text-sm text-black dark:text-white">
          <thead>
            <tr className="border-b dark:border-gray-700 border-gray-300">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">User Name</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left">Resume</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicate, index) => (
              <tr key={index} className="dark:text-gray-200 text-gray-800">
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center flex">
                  <img
                    src={applicate.imgSrc}
                    alt="user profile"
                    className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                  />
                  <span>{applicate.name}</span>
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center max-sm:hidden">
                  {applicate.jobTitle}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 max-sm:hidden">
                  {applicate.location}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-center">
                  <a
                    href=""
                    target="_blank"
                    className="dark:bg-gray-800/80 bg-gray-300/80 px-3 py-1 rounded inline-flex gap-2 items-center"
                  >
                    Resume{" "}
                    <img
                      src={assets.resume_download_icon}
                      alt="resume"
                      className="dark:invert"
                    />
                  </a>
                </td>
                <td className="px-4 py-2 border-b dark:border-gray-700 relative">
                  <div className="relative inline-block text-left group">
                    <button className="dark:text-gray-500 action-button">
                      ...
                    </button>
                    <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 dark:bg-gray-800 bg-gray-400 border dark:border-gray-600 border-gray-300 rounded shadow group-hover:block">
                      <button className="flex items-center justify-between w-full text-left px-4 py-2 text-base dark:hover:bg-gray-700 hover:bg-gray-300 cursor-pointer">
                        Accept <Check className="size-4 sm:size-5" />
                      </button>
                      <button className="flex items-center justify-between w-full text-left px-4 py-2 text-base dark:hover:bg-gray-700 hover:bg-gray-300 cursor-pointer">
                        Reject <X className="size-4 sm:size-5" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ViewApplications;
