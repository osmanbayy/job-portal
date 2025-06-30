import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  assets,
  JobCategories,
  JobLocations,
  jobsData,
} from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

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

        {/* Category Filter */}
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
                        ? "border-indigo-400 bg-gray-400"
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
        </div>

        {/* Location Filter */}
        <div className="max-lg:hidden">
          <h4 className="font-medium text-lg py-4">Search by Location</h4>
          <ul className="space-y-4 text-gray-400">
            {JobLocations.map((location, index) => (
              <li key={index} className="mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedCategories.includes(location)}
                    onChange={() => handleCategoryChange(location)}
                  />
                  <div
                    className={`size-5 border rounded-sm flex items-center justify-center transition ${
                      selectedCategories.includes(location)
                        ? "border-indigo-400 bg-gray-400"
                        : "border-gray-600 bg-gray-700"
                    }`}
                  >
                    <img
                      src={assets.tick_icon}
                      alt="tick"
                      className={`size-4 ${
                        selectedCategories.includes(location)
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
          {jobsData.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobListing;
