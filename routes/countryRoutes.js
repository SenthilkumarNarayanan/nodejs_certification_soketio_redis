import express from "express";
import redisClient from "../config/redisClient.js"; // import redis client

const router = express.Router();

// Test route to check Redis
router.get("/test-redis", async (req, res) => {
  try {
    // Set a key in Redis
    await redisClient.set("my-test-key", "Hello Redis!", { EX: 60 }); // expires in 60 sec

    // Get the key back
    const value = await redisClient.get("my-test-key");

    res.json({
      message: "Redis is working!",
      value,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;