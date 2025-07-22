/* eslint-disable no-unused-vars */
import React from "react";
import { manageJobsData } from "../../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ManageJobs = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.1,
        ease: "easeOut",
        delay: 0.2,
      }}
      className="container p-4 max-w-5xl text-black dark:text-white"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full dark:bg-gray-900 bg-gray-200 border border-gray-700 max-sm:text-sm text-black dark:text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left border-gray-400 dark:border-gray-700 max-sm:hidden">
                #
              </th>
              <th className="py-2 px-4 border-b text-left border-gray-400 dark:border-gray-700">
                Job Title
              </th>
              <th className="py-2 px-4 border-b text-left border-gray-400 dark:border-gray-700 max-sm:hidden">
                Date
              </th>
              <th className="py-2 px-4 border-b text-left border-gray-400 dark:border-gray-700 max-sm:hidden">
                Location
              </th>
              <th className="py-2 px-4 border-b text-center border-gray-400 dark:border-gray-700">
                Applicants
              </th>
              <th className="py-2 px-4 border-b text-left border-gray-400 dark:border-gray-700">
                Visible
              </th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className="dark:text-gray-300 text-gray-800">
                <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-700 max-sm:hidden">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-700">
                  {job.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-700 max-sm:hidden">
                  {moment(job.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-700 max-sm:hidden">
                  {job.location}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-700">
                  {job.applicants}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-700">
                  <input type="checkbox" className="scale-105 ml-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex mt-4 justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-blue-600 py-2 px-4 rounded transition-all border border-blue-600 hover:bg-transparent cursor-pointer text-white hover:text-black dark:hover:text-white"
        >
          Add New Job
        </button>
      </div>
    </motion.div>
  );
};

export default ManageJobs;
