import express from "express";
import { change_job_applications_status, change_visibility, get_company_data, get_company_job_applicants, get_company_posted_jobs, login_company, post_job, register_company } from "../controllers/company_controller.js";
import upload from "../config/multer.js";
import { protect_company } from "../middlewares/auth_middleware.js"

const router = express.Router();

// Register a company
router.post("/register", upload.single("image"), register_company);

// Company login
router.post("/login", login_company);

// Get company data
router.get("/company", protect_company, get_company_data);

// Post a job
router.post("/post-job", protect_company, post_job);

// Get applicants data of company
router.get("/applicants", protect_company, get_company_job_applicants);

// Get company job list
router.get("/list-jobs", protect_company, get_company_posted_jobs);

// Change application status
router.post("/change-status", protect_company, change_job_applications_status);

// Change applications visibility
router.post("/change-visibility", protect_company, change_visibility);

export default router;