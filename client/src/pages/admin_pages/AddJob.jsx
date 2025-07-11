import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../../assets/assets";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow"
      });
    }
  }, []);

  return (
    <form className="container p-4 flex flex-col w-full items-start gap-3">
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-700 rounded outline-none"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Type Here..."
        />
      </div>

      <div className="w-full max-w-lg">
        <p className="my-2">Job Description</p>
        <div ref={editorRef}></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="my-2">Job Category</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-700 outline-none rounded bg-gray-900"
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="my-2">Job Location</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-700 outline-none rounded bg-gray-900"
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="my-2">Job Level</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-700 outline-none rounded bg-gray-900"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>

      <div>
        <p className="my-2">Job Salary</p>
        <input
        className="w-full px-3 py-2 border-2 border-gray-700 rounded sm:w-[120px] no-spinner"
          onChange={(e) => setSalary(e.target.value)}
          type="number"
          placeholder="2500"
          min={0}
        />
      </div>

      <button className="w-28 py-2 mt-4 bg-blue-500 rounded border border-blue-500 transition-all hover:bg-transparent cursor-pointer">ADD</button>
    </form>
  );
};

export default AddJob;
