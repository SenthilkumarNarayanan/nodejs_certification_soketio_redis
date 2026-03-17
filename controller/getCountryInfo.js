import axios from "axios";
import redisClient from "../config/redisClient.js";

const getCountryInfo = async (req, res) => {
  const country = req.params.country;
  const key = `country:${country.toLowerCase()}`; // use consistent key

  try {
    // Check cache
    const cacheData = await redisClient.get(key);
    if (cacheData) {
      console.log(`Cache hit for ${country}`); // log cache hit
      return res.json({
        source: "redis cache",
        data: JSON.parse(cacheData),
      });
    }

    // Cache miss → fetch from Wikipedia
    console.log(`Cache miss for ${country} → fetching from Wikipedia API`);

    const response = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${country}`,
      {
        headers: {
          "User-Agent": "Node.js Redis Project (contact@example.com)",
        },
      }
    );

    // Store in Redis for next requests
    await redisClient.set(key, JSON.stringify(response.data), { EX: 3600 });
    console.log(`Redis key set: ${key}`);
    res.json({
      source: "wikipedia api",
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default getCountryInfo;