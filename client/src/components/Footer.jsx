import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="dark:text-white container w-[90%] max-w-7xl mx-auto flex items-center justify-between gap-4 py-3 px-4 mt-20 border rounded-tr-3xl rounded-tl-3xl dark:border-gray-600 border-gray-300">
      <img src={assets.logo} alt="logo" width={160} className="dark:invert" />
      <p className="flex-1 border-l dark:border-gray-600 border-gray-300 pl-4 text-sm dark:text-gray-300 text-black/60 max-sm:hidden">Copyright @insiderjobs | All Rights Reserved.</p>
      <div className="flex gap-2">
        <img
          src={assets.facebook_icon}
          alt="facebook"
          className="dark:invert transition-all hover:scale-105 cursor-pointer hover:bg-blue-500 dark:hover:bg-amber-400 rounded-full"
          width={38}
        />
        <img
          src={assets.twitter_icon}
          alt="twitter"
          className="dark:invert transition-all hover:scale-105 cursor-pointer hover:bg-blue-500 dark:hover:bg-amber-400 rounded-full"
          width={38}
        />
        <img
          src={assets.instagram_icon}
          alt="insragram"
          className="dark:invert transition-all hover:scale-105 cursor-pointer hover:bg-blue-500 dark:hover:bg-amber-400 rounded-full"
          width={38}
        />
      </div>
    </div>
  );
};

export default Footer;
