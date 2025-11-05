import dotenv from "dotenv";
import { createServer } from "http";
import app from "./src/app.js";

dotenv.config();



const PORT = process.env.PORT || 5000;
const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});