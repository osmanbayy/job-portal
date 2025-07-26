import React from "react";
import { assets } from "../assets/assets";
import { Facebook, Instagram, LinkedinIcon } from "lucide-react";

const Footer = () => {
  return (
    <div className="dark:text-white container w-[90%] max-w-7xl mx-auto flex items-center justify-between gap-4 py-3 px-4 mt-20 border rounded-tr-3xl rounded-tl-3xl dark:border-gray-600 border-gray-300">
      <img src={assets.logo} alt="logo" width={160} className="dark:invert" />
      <p className="flex-1 border-l dark:border-gray-600 border-gray-300 pl-4 text-sm dark:text-gray-300 text-black/60 max-sm:hidden">Copyright @insiderjobs | All Rights Reserved.</p>
      <div className="flex gap-2">
        <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-full p-2 cursor-pointer transition-all hover:scale-105">
          <Facebook className="size-4 md:size-5" />
        </div>
        <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-full p-2 cursor-pointer transition-all hover:scale-105">
          <Instagram  className="size-4 md:size-5"/>
        </div>
        <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-full p-2 cursor-pointer transition-all hover:scale-105">
          <LinkedinIcon  className="size-4 md:size-5"/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
