import express from "express";
import { get_job_by_id, get_jobs } from "../controllers/job_controller.js";

const router = express.Router();

// Route to get all jobs data
router.get("/", get_jobs);
// Route to get a single job by id
router.get("/:id", get_job_by_id);

export default router;