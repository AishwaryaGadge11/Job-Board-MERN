import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import importRoutes from "./routes/importRoutes.js";
import "../src/workers/jobWorker.js";
import logRoutes from "./routes/logRoutes.js";
import "./services/cronservice.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/jobs", jobRoutes);
app.use("/api/import",importRoutes)
app.use("/api/logs",logRoutes)

export default app;