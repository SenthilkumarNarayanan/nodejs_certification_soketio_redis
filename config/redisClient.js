// config/redisClient.js
import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://127.0.0.1:6379"
});

redisClient.on("error", (err) => console.log("Redis Error:", err));
redisClient.on("connect", () => console.log("Redis Client Connected"));

// Top-level await works because package.json has "type": "module"
await redisClient.connect();

export default redisClient;