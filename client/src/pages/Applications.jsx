/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import { Check, Loader, X } from "lucide-react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <div>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.2,
        }}
        className="dark:text-white text-black pt-20 lg:pt-25 container min-h-[85vh] max-w-7xl w-[90%] mx-auto px-4"
      >
        <h2 className="text-base md:text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              <label className="flex items-center" htmlFor="resume-upload">
                <p className="bg-blue-700 text-base px-4 py-2 rounded-xl mr-2 cursor-pointer transition-all hover:bg-blue-600 text-white">
                  Select Resume
                </p>
                <input
                  id="resume-upload"
                  accept="application/pdf"
                  type="file"
                  onChange={(e) => setResume(e.target.files[0])}
                  hidden
                />
                <img
                  src={assets.profile_upload_icon}
                  alt="upload"
                  className="cursor-pointer"
                />
              </label>
              <button
                onClick={() => setIsEdit(false)}
                className="dark:bg-gray-950 bg-gray-200 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-xl cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-black"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                to={"/"}
                className="bg-blue-700 px-4 py-2 rounded-xl transition-all hover:bg-blue-600 text-white"
              >
                Resume
              </Link>
              <button
                onClick={() => setIsEdit(true)}
                className="dark:text-gray-400 text-gray-600 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 cursor-pointer transition-all hover:border-gray-400"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full bg-gray-200 dark:bg-gray-900 rounded-xl max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b dark:border-gray-950 border-gray-300 text-left">
                Company
              </th>
              <th className="py-3 px-4 border-b dark:border-gray-950 border-gray-300 text-left">
                Job Title
              </th>
              <th className="py-3 px-4 border-b dark:border-gray-950 border-gray-300 text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b dark:border-gray-950 border-gray-300 text-left max-sm:hidden">
                Date
              </th>
              <th className="py-3 px-4 border-b dark:border-gray-950 border-gray-300 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) =>
              true ? (
                <tr key={index}>
                  <td className="py-2 px-4 flex items-center gap-2 border-b border-gray-300 dark:border-gray-950">
                    <img
                      src={job.logo}
                      alt="company logo"
                      className="w-8 h-10"
                    />
                    {job.company}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-950 max-sm:text-xs">
                    {job.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-950 max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-950 max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-950">
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-500/70"
                          : job.status === "Rejected"
                          ? "bg-red-500/70"
                          : "bg-blue-500/70"
                      } px-4 py-1.5 rounded-lg lg:w-2/3 w-full flex gap-2 items-center `}
                    >
                      <span className="max-lg:hidden">
                        {job.status === "Pending" ? (
                          <Loader />
                        ) : job.status === "Accepted" ? (
                          <Check />
                        ) : (
                          <X />
                        )}
                      </span>{" "}
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Applications;
