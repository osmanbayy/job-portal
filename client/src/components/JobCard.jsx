import React, { useState } from "react";
import { assets } from "../assets/assets";
import { EllipsisVertical, Heart } from "lucide-react";
import toast from "react-hot-toast";

const JobCard = ({ job }) => {
  const [addFavorite, setAddFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setAddFavorite((prev) => !prev);
    if (!addFavorite) {
      toast.success("Job added to favorites!");
    } else {
      toast.success("Job removed from favorites!");
    }
  };
  return (
    <div className="border bg-gradient-to-l from-gray-800 to-gray-950 border-transparent shadow-xs shadow-indigo-900 rounded p-6">
      <div className="flex justify-between items-center">
        <img src={assets.company_icon} alt="company" className="size-8" />
        <div className="flex items-center gap-2">
          <Heart
            onClick={handleFavoriteClick}
            className={`size-6 cursor-pointer transition-all ${
              addFavorite && "fill-red-500 text-red-500"
            }`}
          />
          <EllipsisVertical className="size-6 cursor-pointer" />
        </div>
      </div>

      <h4 className="font-medium text-xl mt-2">{job.title}</h4>

      <div className="flex items-center gap-3 text-gray-100 mt-2 text-xs">
        <span className="bg-gradient-to-b from-gray-800 to-gray-950  px-4 py-1.5 border border-gray-700 rounded-full cursor-pointer transition hover:from-gray-950 hover:to-gray-800 hover:border-gray-500 hover:shadow">
          {job.location}
        </span>
        <span className="bg-gradient-to-b from-gray-800 to-gray-950  px-4 py-1.5 border border-gray-700 rounded-full cursor-pointer transition hover:from-gray-950 hover:to-gray-800 hover:border-gray-500">
          {job.level}
        </span>
      </div>

      <p
        className="text-gray-300 mt-4 text-sm"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      <div className="flex items-center mt-4 gap-4">
        <button className="bg-blue-700 border border-blue-700 text-sm rounded-xl px-4 py-2 cursor-pointer hover:bg-transparent transition">
          Apply Now
        </button>
        <button className="bg-transparent text-sm rounded-xl px-4 py-2 cursor-pointer border border-gray-700 hover:border-blue-500 transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
