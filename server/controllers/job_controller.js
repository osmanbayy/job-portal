import Job from "../models/Job.js"

// Get all jobs
export const get_jobs = async (request, response) => {
  try {
    const jobs = await Job.find({ visible: true })
      .populate({
        path: 'companyId', select: "-password"
      });

    response.json({ success: true, jobs })
  } catch (error) {
    response.json({ success: false, message: error.message })
  }
}

// Get a single job by id
export const get_job_by_id = async (request, response) => {
  try {
    const { id } = request.params;

    const job = await Job.findById(id)
      .populate({
        path: 'companyId', select: "-password"
      });

    if (!job) {
      return response.json({ success: false, message: "Job not found!" });
    }

    response.json({ success: true, job });
  } catch (error) {
    response.json({ success: false, message: error.message })
  }
}