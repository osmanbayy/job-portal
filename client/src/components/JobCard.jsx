import React, { useState } from "react";
import { assets } from "../assets/assets";
import { EllipsisVertical, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const [addFavorite, setAddFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    setAddFavorite((prev) => !prev);
    if (!addFavorite) {
      toast.success("Job added to favorites!");
    } else {
      toast.success("Job removed from favorites!");
    }
  };

  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/apply-job/${job._id}`);
        scrollTo(0, 0);
      }}
      className="border bg-gradient-to-l dark:from-gray-800 from-zinc-100/30 to-zinc-200/30 dark:to-gray-950 border-transparent shadow-xs dark:shadow-indigo-900 shadow-gray-700 hover:shadow-sm rounded-3xl p-6 transition-colors duration-500 hover:border-blue-500 dark:hover:border-gray-400 cursor-pointer"
    >
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

      <div className="flex items-center gap-3 dark:text-gray-100 mt-2 text-xs transition-colors duration-500">
        <span className="bg-gradient-to-b dark:from-gray-800 from-gray-100 to-gray-300 dark:to-gray-950  px-4 py-1.5 border dark:border-gray-700 border-gray-400 rounded-full cursor-pointer transition dark:hover:from-gray-950 hover:from-gray-300 hover:to-gray-100 dark:hover:to-gray-800 hover:border-gray-500 hover:shadow">
          {job.location}
        </span>
        <span className="bg-gradient-to-b dark:from-gray-800 from-gray-100 to-gray-300 dark:to-gray-950 px-4 py-1.5 border dark:border-gray-700 border-gray-400 rounded-full cursor-pointer transition dark:hover:from-gray-950 hover:from-gray-300 hover:to-gray-100 dark:hover:to-gray-800 hover:border-gray-500">
          {job.level}
        </span>
      </div>

      <p
        className="dark:text-gray-300 mt-4 text-sm"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      <div className="flex items-center mt-4 gap-4">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="dark:bg-blue-700 bg-blue-500 border border-blue-500 dark:border-blue-700 text-sm rounded-xl px-4 py-2 cursor-pointer hover:bg-transparent transition"
        >
          Apply Now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-transparent text-sm rounded-xl px-4 py-2 cursor-pointer border border-gray-700 hover:border-blue-500 transition"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
