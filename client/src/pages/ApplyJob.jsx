import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import { motion } from "framer-motion";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer"

const ApplyJob = () => {
  const { id } = useParams();

  const [jobData, setJobData] = useState(null);

  const { jobs } = useContext(AppContext);

  const fetchJobs = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
      console.log(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJobs();
    }
  }, [id, jobs]);

  return jobData ? (
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
        className="pt-20 md:pt-25 pb-10 text-white min-h-screen flex flex-col container px-4 max-w-7xl w-[90%] mx-auto"
      >
        <div className="bg-white/5 rounded-2xl border border-gray-700 w-full mb-10">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-10 mb-6">
            {/* Company Logo and Job Title */}
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={jobData.companyId.image}
                alt="company"
                className="h-24 bg-transparent rounded-2xl p-4 mr-4 max-md:mb-4 border border-gray-700"
              />
              <div className="text-center md:text-left text-neutral-300">
                <h1 className="text-2xl sm:text-4xl font-medium">
                  {jobData.title}
                </h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-400 mt-2">
                  <span className="flex items-center gap-2">
                    <img
                      src={assets.suitcase_icon}
                      alt="suitcase"
                      className="invert"
                    />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src={assets.location_icon}
                      alt="location"
                      className=""
                    />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.person_icon} alt="person" className="" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-2">
                    <img
                      src={assets.money_icon}
                      alt="salary"
                      className="invert"
                    />
                    CTC: ${kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            {/* Apply Button and Posted Date */}
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button className="bg-blue-600 p-2.5 px-10 rounded-2xl cursor-pointer border border-blue-600 transition-all hover:bg-transparent">
                Apply Now
              </button>
              <p className="mt-1 text-gray-500">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="w-full lg:w-3/4">
            <h2 className="font-bold text-2xl mb-4">Job Description</h2>
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: jobData.description }}
            ></div>
            <button className="bg-blue-600 p-2.5 px-10 rounded-2xl cursor-pointer border border-blue-600 transition-all hover:bg-transparent text-sm">
              Apply Now
            </button>
          </div>
          {/* Right Section */}
          <div className="w-full lg:w-1/4 mt-8 lg:mt-0 lg:ml-8 space-y-4">
            <h2>More Jobs from {jobData.companyId.name}</h2>
            {jobs
              .filter(
                (job) =>
                  job._id !== jobData._id &&
                  job.companyId._id === jobData.companyId._id
              )
              .filter((job) => true)
              .slice(0, 4)
              .map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
