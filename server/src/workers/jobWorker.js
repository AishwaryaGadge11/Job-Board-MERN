import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import Job from "../models/jobModel.js";
import ImportLog from "../models/importLogModel.js";

const jobWorker = new Worker(
  "jobImport",
  async (job) => {
    const data = job.data;
    const { importLogId, jobId, ...jobDetails } = data;

    try {
      const existing = await Job.findOne({ jobId });

      if (existing) {
        await Job.updateOne({ jobId }, jobDetails);
        await ImportLog.findByIdAndUpdate(importLogId, { $inc: { updatedJobs: 1 } });
        return { status: "updated" };
      } else {
        await Job.create({ jobId, ...jobDetails });
        await ImportLog.findByIdAndUpdate(importLogId, { $inc: { newJobs: 1 } });
        return { status: "created" };
      }
    } catch (err) {
      console.error("❌ Worker error:", err.message);
      if (importLogId) {
        await ImportLog.findByIdAndUpdate(importLogId, {
          $inc: { failedJobs: 1 },
          $push: { failedReasons: err.message },
        });
      }
      throw err;
    }
  },
  { connection: redisConnection, concurrency: 10 } // Process 10 jobs at once
);

jobWorker.on("completed", (job, result) => {
  console.log(`✅ Job ${job.id} ${result.status}`);
});

jobWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed: ${err.message}`);
});

export default jobWorker;
