/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Eye, EyeClosed } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RecruiterLogin = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [image, setImage] = useState(false);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true);
    }

    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/company/login`, {
          email,
          password,
        });

        if(data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
          toast.success("Welcome!");
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        const { data } = await axios.post(`${backendUrl}/api/company/register`, formData);
        if(data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.1,
        ease: "easeOut",
        delay: 0.2,
      }}
      className="absolute inset-0 z-10 backdrop-blur-xl dark:bg-black/3 bg-white/1 flex justify-center items-center"
    >
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col relative bg-gradient-to-t dark:from-gray-900 from-zinc-100 to-zinc-200 dark:to-gray-950 p-10 rounded-xl dark:text-slate-300 border border-gray-400 dark:border-gray-700"
      >
        <h1 className="text-center text-2xl dark:text-neutral-300 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue.</p>
        {state === "Sign Up" && isTextDataSubmitted ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="upload"
                  className="w-16 rounded-full cursor-pointer"
                />
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                />
              </label>
              <p>
                Upload Company <br /> Logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border border-gray-400 dark:border-gray-600 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img
                  src={assets.person_icon}
                  alt="person"
                  className="size-4 invert dark:invert-0"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Company Name"
                  required
                  className="outline-none text-sm"
                />
              </div>
            )}

            <div className="border border-gray-400 dark:border-gray-600 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img
                src={assets.email_icon}
                alt="email"
                className="size-4 invert dark:invert-0"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="outline-none text-sm"
              />
            </div>
            <div className="relative border border-gray-400 dark:border-gray-600 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img
                src={assets.lock_icon}
                alt="lock"
                className="size-4 dark:invert-0"
              />
              <div className="">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="outline-none text-sm"
                />
                {showPassword ? (
                  <Eye
                    onClick={() => setShowPassword(false)}
                    className="size-4 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  />
                ) : (
                  <EyeClosed
                    onClick={() => setShowPassword(true)}
                    className="size-4 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </>
        )}

        {state === "Login" && (
          <p className="text-sm mt-4 cursor-pointer text-blue-500 transition-all duration-300 hover:tracking-wide">
            Forgot password?
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-700 w-full border border-blue-700 py-2 mt-4 text-white rounded-full cursor-pointer transition duration-300 hover:bg-transparent dark:hover:text-white hover:text-black"
        >
          {state === "Login"
            ? "Sign In"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        {state === "Login" ? (
          <p className="text-sm mt-2 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-sm mt-2 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowRecruiterLogin(false)}
          src={assets.cross_icon}
          alt="close"
          className="absolute top-3 right-3 cursor-pointer border p-2 rounded-full border-gray-600 transition-all hover:invert"
        />
      </form>
    </motion.div>
  );
};

export default RecruiterLogin;
