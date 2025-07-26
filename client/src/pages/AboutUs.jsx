/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.2,
        }}
        className="pt-20 md:pt-25 pb-10 dark:text-white min-h-screen flex flex-col container px-4 max-w-7xl w-[90%] mx-auto"
      >
        <div className="flex lg:flex-row flex-col items-center justify-between text-center lg:text-left gap-15 w-full h-full px-5">
          <div className="">
            <img
              src={assets.aboutUs2}
              alt="about us"
              className="w-full h-[20rem] md:h-[40rem] rounded-sm object-cover dark:brightness-50 transition-all duration-500"
            />
            <div>
              <h2 className="md:text-4xl text-3xl mt-5 font-serif">
                Insider Jobs Innovations
              </h2>
            </div>
          </div>
          <div className="flex-1 justify-end">
            <h1 className="text-4xl md:text-7xl uppercase tracking-tighter font-mono mb-5">
              About Us
            </h1>
            <div className="flex flex-col gap-4">
              <p className="text-gray-500 dark:text-gray-300">
                Welcome to our Job Portal — your trusted gateway to career
                opportunities and top talent.
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                We are a passionate team of developers and career enthusiasts
                who believe in simplifying the hiring process through
                technology. Our mission is to connect job seekers with
                meaningful opportunities and help companies find the right
                talent — fast, fair, and efficiently.
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                Whether you're looking for your first job, your next big career
                move, or the perfect candidate to grow your team, our platform
                is designed to make the journey easier. With real-time listings,
                personalized recommendations, and a user-friendly interface, we
                aim to create a space where opportunity meets ambition.
              </p>
              <p className="text-gray-500 dark:text-gray-300">
                We’re committed to transparency, innovation, and empowering
                people to take the next step in their careers — because we
                believe that everyone deserves a chance to thrive.
              </p>
              <p>Thank you for being part of our journey.</p>
              <p>Let’s build the future of work, together.</p>
            </div>

            <div className="flex items-center justify-center lg:justify-start">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 group mt-5 px-4 py-2 border dark:border-gray-700 border-gray-300 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900"
              >
                <MoveLeft className="group-hover:mr-1 transition-all duration-200" />{" "}
                Go Back to Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
