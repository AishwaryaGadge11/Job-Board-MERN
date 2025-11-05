import mongoose from "mongoose";

const importLogSchema = new mongoose.Schema(
  {
    sourceUrl: String,
    timestamp: { type: Date, default: Date.now },
    totalFetched: Number, // number fetched from API
    totalImported: Number, // total pushed to queue
    newJobs: { type: Number, default: 0 }, // records newly inserted
    updatedJobs: { type: Number, default: 0 }, // records updated
    failedJobs: { type: Number, default: 0 }, // DB/validation errors
    failedReasons: [String],
  },
  { timestamps: true }
);

const ImportLog = mongoose.model("ImportLog", importLogSchema);
export default ImportLog;
