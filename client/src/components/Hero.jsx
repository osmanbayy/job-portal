import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const jobTitleRef = useRef(null);
  const jobLocationRef = useRef(null);

  const handleSearch = () => {
    setSearchFilter({
      jobTitle: jobTitleRef.current.value,
      jobLocation: jobLocationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <div className="pt-20 text-white container mx-auto w-[92%] max-w-7xl">
      <div className="bg-gradient-to-t from-gray-900 to-gray-950 py-16 text-center mx-2 rounded-xl border border-gray-800 px-3 sm:px-6 md:px-8 lg:px-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ Jobs to Apply!
        </h1>
        <p className="capitalize mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your next big career move start right here - explore the best job
          opportunities and take the first step toward your future!
        </p>

        <div className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl text-gray-400 max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex items-center gap-2">
            <img src={assets.search_icon} alt="search" className="h-4 sm:h-5" />
            <input
              type="text"
              ref={jobTitleRef}
              placeholder="Search for jobs..."
              className="max-sm:text-xs p-2 rounded outline-none w-full placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <img
              src={assets.location_icon}
              alt="location"
              className="h-4 sm:h-5"
            />
            <input
              type="text"
              ref={jobLocationRef}
              placeholder="Location"
              className="max-sm:text-xs p-2 rounded outline-none w-full placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-indigo-800 px-6 py-2 rounded-xl m-1 cursor-pointer text-white border border-indigo-800 hover:bg-transparent hover:border-gray-800 transition-all"
          >
            Search
          </button>
        </div>
      </div>

      {/* Companies Logos */}
      <div className="border border-gray-700 shadow-md mx-2 mt-5 p-6 rounded-xl flex justify-center">
        <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium">Trusted By:</p>
          <img src={assets.microsoft_logo} alt="microsoft" className="h-6" />
          <img src={assets.walmart_logo} alt="walmart" className="h-6" />
          <img
            src={assets.accenture_logo}
            alt="accenture"
            className="h-6 invert"
          />
          <img src={assets.samsung_logo} alt="samsung" className="h-6" />
          <img src={assets.amazon_logo} alt="amazon" className="h-6 invert" />
          <img src={assets.adobe_logo} alt="adobe" className="h-6" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
