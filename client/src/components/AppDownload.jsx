import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="container px-4 w-[90%] max-w-7xl mx-auto my-20">
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-950 p-12 sm:p-24 lg:p-32 rounded-xl border border-gray-700 text-white">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold mb-8 max-w-md">
            Download Mobile App for Better Experience
          </h1>
          <div className="flex gap-4">
            <Link to={"/"} className="inline-block">
              <img src={assets.play_store} alt="play-store" className="h-12 select-none" />
            </Link>
            <Link to={"/"} className="inline-block">
              <img src={assets.app_store} alt="app-store" className="h-12 select-none" />
            </Link>
          </div>
        </div>
        <img src={assets.app_main_img} alt="" className="absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden" />
      </div>
    </div>
  );
};

export default AppDownload;
