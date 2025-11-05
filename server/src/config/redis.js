import Redis from "ioredis";

const redisConnection = new Redis(process.env.REDIS_URL,{
    maxRetriesPerRequest: null,
  enableReadyCheck: false,
  connectTimeout: 10000,
  lazyConnect: false,   
});
redisConnection.on("connect", () => {
    console.log("📦 Redis Connected");
});
redisConnection.on("error", (err) => {
    console.error("❌ Redis Error: ", err);
});

export default redisConnection;