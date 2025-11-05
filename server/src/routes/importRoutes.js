import express from "express";
import { fetchAndQueueJobs } from "../services/jobFetchService.js";

const router = express.Router();
router.get("/run",async(req,res)=>{
    try {
        await fetchAndQueueJobs();
        res.json({message:"job import started"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

export default router