import Company from "../models/Company.js"
import Job from "../models/Job.js"
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generate_token from "../utils/generate_token.js";

// Register a new company
export const register_company = async (request, response) => {
  const { name, email, password } = request.body;
  const image_file = request.file;

  if (!name || !email || !password || !image_file) {
    return response.json({ success: false, message: "Missing Details!" });
  }

  try {
    const companyAlreadyExist = await Company.findOne({ email })
    if (companyAlreadyExist) {
      return response.json({ success: false, message: "Company is already exist!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const image_upload = await cloudinary.uploader.upload(image_file.path);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: image_upload.secure_url
    });

    response.json({
      success: true, company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image
      },
      token: generate_token(company._id)
    })
  } catch (error) {
    console.log("Error in register_company controller");
    response.json({ success: false, message: error.message });
  }
}

// Company login
export const login_company = async (request, response) => {
  const { email, password } = request.body;

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return response.json({ success: false, message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return response.json({ success: false, message: "Invalid email or password!" });
    }

    response.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generate_token(company._id),
    });

  } catch (error) {
    console.error("Error in login_company controller:", error);
    response.status(500).json({ success: false, message: "Server error" });
  }
};


// Get company data
export const get_company_data = async (request, response) => {
  try {
    const company = request.company;
    response.json({ success: true, company });
  } catch (error) {
    console.log("Error in get_company_data controller");
    response.json({ success: false, message: error.message })
  }
}

// Post a new job
export const post_job = async (request, response) => {
  const { title, description, location, salary, level, category } = request.body;
  const company_id = request.company._id;

  if (!title || !description || !location || !salary || !level || !category) {
    return response.json({ success: false, message: "All Fields Required!" });
  }

  try {
    const new_job = new Job({
      title,
      description,
      location,
      salary,
      companyId: company_id,
      date: Date.now(),
      level,
      category
    });

    await new_job.save();

    return response.json({ success: true, new_job, message: "Job posted successfully!" });
  } catch (error) {
    console.log("Error in post_job controller");
    response.json({ success: false, message: error.message });
  }
}

// Get company job applicants
export const get_company_job_applicants = async (request, response) => {

}

// Get company posted jobs
export const get_company_posted_jobs = async (request, response) => {
  try {
    const companyId = request.company._id;

    const jobs = await Job.find({ companyId });
    response.json({ success: true, jobsData: jobs });
  } catch (error) {
    console.log("Error in get_company_posted_jobs controller");
    response.json({ success: false, message: error.message })
  }
}

// Change job application status
export const change_job_applications_status = async (request, response) => {

}

// Change job visibility
export const change_visibility = async (request, response) => {
  try {
    const { id } = request.body;
    const companyId = request.company._id;

    const job = await Job.findById(id);
    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }

    await job.save();

    response.json({ success: true, job })
  } catch (error) {
    console.log("Error in change_visibility controller");
    response.json({ success: false, message: error.message })
  }
}