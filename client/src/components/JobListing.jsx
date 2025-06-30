import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);
  return (
    <div className="text-white container mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 max-w-7xl w-[90%]">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-transparent px-4">
        {/* Search Filter from Hero Component */}
        {isSearched &&
          (searchFilter.jobTitle !== "" || searchFilter.jobLocation !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>

              <div className="mb-4 text-gray-300">
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
                  <span className="inline-flex items-center gap-2.5 bg-gray-800 px-3 py-1 rounded-full text-sm border border-gray-600 ml-2">
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
      </div>

      <div></div>
    </div>
  );
};

export default JobListing;
