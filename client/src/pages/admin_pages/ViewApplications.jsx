import React from "react";
import { assets, viewApplicationsPageData } from "../../assets/assets";

const ViewApplications = () => {
  return (
    <div className="container mx-auto p-4">
      <div>
        <table className="w-full max-w-4xl bg-gray-900 border border-gray-700 max-sm:text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">User Name</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 text-left">Resume</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicate, index) => (
              <tr key={index} className="text-gray-200">
                <td className="px-4 py-2 border-b border-gray-700 text-center">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-b border-gray-700 text-center flex">
                  <img src={applicate.imgSrc} alt="user profile" className="w-10 h-10 rounded-full mr-3 max-sm:hidden" />
                  <span>{applicate.name}</span>
                </td>
                <td className="px-4 py-2 border-b border-gray-700 text-center max-sm:hidden">
                  {applicate.jobTitle}
                </td>
                <td className="px-4 py-2 border-b border-gray-700 max-sm:hidden">
                  {applicate.location}
                </td>
                <td className="px-4 py-2 border-b border-gray-700 text-center">
                  <a href="" target="_blank" className="bg-gray-800/80 px-3 py-1 rounded inline-flex gap-2 items-center">
                    Resume{" "}
                    <img
                      src={assets.resume_download_icon}
                      alt="resume"
                      className="invert"
                    />
                  </a>
                </td>
                <td className="px-4 py-2 border-b border-gray-700 relative">
                  <div className="relative inline-block text-left group">
                    <button className="text-gray-500 action-button">...</button>
                    <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-gray-800/80 border border-gray-600 rounded shadow group-hover:block">
                      <button className="block w-full text-left px-4 py-2 text-base hover:bg-gray-700/80 cursor-pointer">Accept</button>
                      <button className="block w-full text-left px-4 py-2 text-base hover:bg-gray-700/80 cursor-pointer">Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
