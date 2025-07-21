import express from "express";
import { apply_for_job, get_user_data, get_user_job_applications, update_user_resume } from "../controllers/user_controller.js";
import upload from "../config/multer.js";

const router = express.Router();

// Get user data
router.get("/user", get_user_data);

// Apply for a job
router.post("/apply", apply_for_job);

// Get user applied applications
router.get("/applications", get_user_job_applications);

// Update user profile (resume)
router.post("/update-resume", upload.single('resume'), update_user_resume);

export default router;