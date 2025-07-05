import React from "react";
import { manageJobsData } from "../../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ManageJobs = () => {
  const navigate = useNavigate();
  return (
    <div className="containe p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 border border-gray-700 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left border-gray-700 max-sm:hidden">
                #
              </th>
              <th className="py-2 px-4 border-b text-left border-gray-700">
                Job Title
              </th>
              <th className="py-2 px-4 border-b text-left border-gray-700 max-sm:hidden">
                Date
              </th>
              <th className="py-2 px-4 border-b text-left border-gray-700 max-sm:hidden">
                Location
              </th>
              <th className="py-2 px-4 border-b text-center border-gray-700">
                Applicants
              </th>
              <th className="py-2 px-4 border-b text-left border-gray-700">
                Visible
              </th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className="text-gray-300">
                <td className="py-2 px-4 border-b border-gray-700 max-sm:hidden">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  {job.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 max-sm:hidden">
                  {moment(job.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b border-gray-700 max-sm:hidden">
                  {job.location}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  {job.applicants}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <input type="checkbox" className="scale-105 ml-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex mt-4 justify-end">
        <button onClick={() => navigate("/dashboard/add-job")} className="bg-blue-600 py-2 px-4 rounded transition-all border border-blue-600 hover:bg-transparent cursor-pointer">Add New Job</button>
      </div>
    </div>
  );
};

export default ManageJobs;
