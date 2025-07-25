/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { data, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const { backendUrl, companyToken } = useContext(AppContext);

  // Function to fecth company jobs applications data
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
      } else {
        toast.error(data.message || "Failed to fetch jobs data");
      }
    } catch (error) {
      toast.error(data.message || error.message);
    }
  };

  // Function to change job visibility
  const changeJobVisibility = async (jobId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-visibility`,
        { id: jobId },
        {
          headers: { token: companyToken },
        }
      );
      if (data.success) {
        toast.success("Job visibility changed successfully!");
        fetchCompanyJobs();
      } else {
        toast.error(data.message || "Failed to change job visibility");
      }
    } catch (error) {
      toast.error(error.message || "Failed to change job visibility");
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

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
            {jobs.map((job, index) => (
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
                <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-700 text-center">
                  {job.applicants}
                </td>
                <td className="py-2 px-4 border-b border-gray-400 dark:border-gray-700">
                  <input
                    type="checkbox"
                    className="scale-105 ml-4"
                    onChange={() => changeJobVisibility(job._id)}
                    checked={job.visible}
                  />
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
