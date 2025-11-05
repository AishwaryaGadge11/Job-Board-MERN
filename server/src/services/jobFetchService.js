import axios from "axios";
import xml2js from "xml2js";
import jobQueue from "../jobs/jobQueue.js";
import ImportLog from "../models/importLogModel.js";

const jobFeeds = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=design-multimedia",
  "https://jobicy.com/?feed=job_feed&job_categories=data-science",
  "https://jobicy.com/?feed=job_feed&job_categories=management",
];

const parseXML = (xml) =>
  new Promise((resolve, reject) => {
    xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

const formatJob = (job, url) => ({
  jobId: job.guid?._ || job.link,
  title: job.title,
  company: job["job:company_name"],
  location: job["job:location"],
  description: job.description,
  url: job.link,
  source: url,
});

export const fetchAndQueueJobs = async () => {
  console.log("🚀 Starting job import...");

  for (const url of jobFeeds) {
    try {
      const response = await axios.get(url);
      const data = await parseXML(response.data);

      const items = data?.rss?.channel?.item;
      const jobs = Array.isArray(items) ? items : [items];
      const totalFetched = jobs.length;

      // 🧾 Step 1: Create import log before queueing
      const importLog = await ImportLog.create({
        sourceUrl: url,
        totalFetched,
        totalImported: 0,
        newJobs: 0,
        updatedJobs: 0,
        failedJobs: 0,
      });

      console.log(`📥 ${totalFetched} jobs fetched from ${url}`);

      // 🧩 Step 2: Add jobs to queue (in batches)
      const BATCH_SIZE = 100;
      for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
        const batch = jobs.slice(i, i + BATCH_SIZE);

        await Promise.all(
          batch.map(async (job) => {
            const jobData = formatJob(job, url);
            await jobQueue.add("import", { ...jobData, importLogId: importLog._id });
          })
        );
      }

      // Update totalImported (queued count)
      await ImportLog.findByIdAndUpdate(importLog._id, {
        totalImported: totalFetched,
      });

      console.log(`✅ Queued ${totalFetched} jobs for ${url}`);
    } catch (err) {
      console.error(`❌ Error importing from ${url}:`, err.message);
    }
  }

  console.log("🎉 All feeds queued successfully!");
};
