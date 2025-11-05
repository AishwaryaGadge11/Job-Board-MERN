import cron from 'node-cron'
import { fetchAndQueueJobs } from './jobFetchService.js';

cron.schedule("0 * * * *",async()=>{
    console.log("⏰ Cron triggered — starting automatic job import...");
    try {
        await fetchAndQueueJobs();
        console.log("Automatic import completed successfully");
        
    } catch (error) {
        console.error("❌ Cron import failed:", err.message);
        
    }
    
})