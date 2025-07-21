import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import { v2 as cloudinary } from "cloudinary";

// Get user data
export const get_user_data = async (request, response) => {
  const userId = request.auth.userId;

  try {
    const user = await User.findById(userId).select("-password -__v");
    if (!user) {
      return response.json({ success: false, message: "User not found" });
    }

    response.json({ success: true, user });
  } catch (error) {
    console.error("Error in get_user_data controller");
    response.status(500).json({ success: false, message: error.message });
  }
}

// Apply for a job
export const apply_for_job = async (request, response) => {
  const { jobId } = request.body;
  const userId = request.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });
    if (isAlreadyApplied.length > 0) {
      return response.json({ success: false, message: "You have already applied for this job" });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return response.json({ success: false, message: "Job not found" });
    }

    await JobApplication.create({
      userId,
      companyId: jobData.companyId,
      jobId,
      status: "Pending",
      date: Date.now()
    });

    response.json({ success: true, message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error in apply_for_job controller");
    response.json({ success: false, message: error.message });
  }
}

// Get user applied applications
export const get_user_job_applications = async (request, response) => {
  try {
    const userId = request.auth.userId;
    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary ")
      .select("-__v")
      .exec();

    if (!applications || applications.length === 0) {
      return response.json({ success: false, message: "No applications found" });
    }

    return response.json({ success: true, applications });
  } catch (error) {
    console.error("Error in get_user_job_applications controller");
    response.json({ success: false, message: error.message });
  }
}

// Update user profile (resume)
export const update_user_resume = async (request, response) => {
  try {
    const userId = request.auth.userId;
    const resumeFile = request.resumeFile;

    const user = await User.findById(userId);
    if (!user) {
      return response.json({ success: false, message: "User not found" });
    }

    if (!resumeFile) {
      return response.json({ success: false, message: "Resume file is required" });
    } else {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      user.resume = resumeUpload.secure_url;
    }

    await user.save();

    return response.json({ success: true, message: "Resume updated successfully!" });
  } catch (error) {
    console.error("Error in update_user_resume controller");
    response.json({ success: false, message: error.message });
  }
}