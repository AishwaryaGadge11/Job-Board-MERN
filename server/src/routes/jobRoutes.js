import express from "express";
import jobQueue from "../jobs/jobQueue.js";

const router = express.Router()
router.post("/add", async (req, res) => {
    const jobData = req.body;
  
    await jobQueue.add("import", jobData);
    res.json({ message: "Job added to queue ✅" });
  });
  
  export default router;