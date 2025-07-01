import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";
import { ListFilter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((loc) => loc !== location)
        : [...prev, location]
    );
  };

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const NAVBAR_HEIGHT = 88;
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const jobList = document.getElementById("job-list");
    if (jobList) {
      const y =
        jobList.getBoundingClientRect().top +
        window.pageYOffset -
        NAVBAR_HEIGHT;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const matchesCategory = (job) => selectedCategories.length === 0 || selectedCategories.includes(job.category);
    const matchesLocation = (job) => selectedLocations.length === 0 || selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.jobTitle === "" ||
      job.title?.toLowerCase().includes(searchFilter.jobTitle?.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.jobLocation === "" ||
      job.location
        ?.toLowerCase()
        .includes(searchFilter.jobLocation?.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="text-white container mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 max-w-7xl w-[90%]">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-transparent px-4">
        {/* Search Filter from Hero Component */}
        {isSearched &&
          (searchFilter.jobTitle !== "" || searchFilter.jobLocation !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>

              <div className="mb-4 text-gray-300 flex flex-wrap gap-2">
                {searchFilter.jobTitle && (
                  <span className="inline-flex items-center gap-2.5 bg-gray-800 px-3 py-1 rounded-full text-sm border border-gray-600">
                    {searchFilter.jobTitle}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, jobTitle: "" }))
                      }
                      src={assets.cross_icon}
                      alt=""
                      className="cursor-pointer invert"
                    />
                  </span>
                )}
                {searchFilter.jobLocation && (
                  <span className="inline-flex items-center gap-2.5 bg-gray-800 px-3 py-1 rounded-full text-sm border border-gray-600">
                    {searchFilter.jobLocation}
                    <img
                      onClick={() =>
                        setSearchFilter((prev) => ({
                          ...prev,
                          jobLocation: "",
                        }))
                      }
                      src={assets.cross_icon}
                      alt=""
                      className="cursor-pointer invert"
                    />
                  </span>
                )}
              </div>
            </>
          )}

        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="flex items-center gap-3 px-4 py-1.5 rounded border border-gray-600 lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}{" "}
          {!showFilter && <ListFilter className="size-4" />}
        </button>

        {/* Category Filter (Mobile: Animated, Desktop: Static) */}
        <div className="lg:hidden">
          <AnimatePresence>
            {showFilter && (
              <motion.div
                key="category-filter"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-medium text-lg py-4">
                  Search by Categories
                </h4>
                <ul className="space-y-4 text-gray-400">
                  {JobCategories.map((category, index) => (
                    <li key={index} className="mb-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <div
                          className={`size-5 border rounded-sm flex items-center justify-center transition ${
                            selectedCategories.includes(category)
                              ? "border-indigo-400 bg-gray-600"
                              : "border-gray-600 bg-gray-700"
                          }`}
                        >
                          <img
                            src={assets.tick_icon}
                            alt="tick"
                            className={`size-4 ${
                              selectedCategories.includes(category)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                        </div>
                        <span>{category}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="max-lg:hidden">
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="space-y-4 text-gray-400">
            {JobCategories.map((category, index) => (
              <li key={index} className="mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <div
                    className={`size-5 border rounded-sm flex items-center justify-center transition ${
                      selectedCategories.includes(category)
                        ? "border-indigo-400 bg-gray-600"
                        : "border-gray-600 bg-gray-700"
                    }`}
                  >
                    <img
                      src={assets.tick_icon}
                      alt="tick"
                      className={`size-4 ${
                        selectedCategories.includes(category)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </div>
                  <span className="transition-all hover:tracking-wide">{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter (Mobile: Animated, Desktop: Static) */}
        <div className="lg:hidden">
          <AnimatePresence>
            {showFilter && (
              <motion.div
                key="location-filter"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-medium text-lg py-4">Search by Location</h4>
                <ul className="space-y-4 text-gray-400">
                  {JobLocations.map((location, index) => (
                    <li key={index} className="mb-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={selectedLocations.includes(location)}
                          onChange={() => handleLocationChange(location)}
                        />
                        <div
                          className={`size-5 border rounded-sm flex items-center justify-center transition ${
                            selectedLocations.includes(location)
                              ? "border-indigo-400 bg-gray-600"
                              : "border-gray-600 bg-gray-700"
                          }`}
                        >
                          <img
                            src={assets.tick_icon}
                            alt="tick"
                            className={`size-4 ${
                              selectedLocations.includes(location)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                        </div>
                        <span>{location}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="max-lg:hidden">
          <h4 className="font-medium text-lg py-4">Search by Location</h4>
          <ul className="space-y-4 text-gray-400">
            {JobLocations.map((location, index) => (
              <li key={index} className="mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedLocations.includes(location)}
                    onChange={() => handleLocationChange(location)}
                  />
                  <div
                    className={`size-5 border rounded-sm flex items-center justify-center transition ${
                      selectedLocations.includes(location)
                        ? "border-indigo-400 bg-gray-600"
                        : "border-gray-600 bg-gray-700"
                    }`}
                  >
                    <img
                      src={assets.tick_icon}
                      alt="tick"
                      className={`size-4 ${
                        selectedLocations.includes(location)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </div>
                  <span className="transition-all hover:tracking-wide">{location}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <section className="w-full lg:w-3/4 bg-transparent max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8">Get your desired job from top companies!</p>

        {/* Job Cards */}
        <div className="grid grid-cols-1 gap-2">
          <AnimatePresence mode="wait">
            {filteredJobs.length > 0 ? (
              filteredJobs
                .slice((currentPage - 1) * 6, currentPage * 6)
                .map((job, index) => (
                  <motion.div
                    key={`${job.id || index}-${currentPage}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))
            ) : (
              <div className="text-xl px-4 py-2 bg-gray-800 rounded-xl">
                No jobs were found matching your searches. 😢 <br />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10 text-white">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="disabled:opacity-50 disabled:cursor-not-allowed size-10 flex items-center justify-center border border-gray-700 hover:border-gray-500 transition rounded cursor-pointer"
            >
              <img src={assets.left_arrow_icon} alt="left" />
            </button>
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`size-10 flex items-center justify-center border  rounded cursor-pointer transition ${
                    currentPage === index + 1
                      ? "bg-blue-700 border-white"
                      : "text-gray-500 hover:border-gray-400 border-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              onClick={() =>
                handlePageChange(
                  Math.min(Math.ceil(filteredJobs.length / 6), currentPage + 1)
                )
              }
              disabled={currentPage === Math.ceil(filteredJobs.length / 6)}
              className="disabled:opacity-50 disabled:cursor-not-allowed size-10 flex items-center justify-center border border-gray-700 hover:border-gray-500 transition rounded cursor-pointer"
            >
              <img src={assets.right_arrow_icon} alt="right" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
