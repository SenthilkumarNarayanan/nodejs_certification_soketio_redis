import axios from "axios";
import redisClient from "../config/redisClient.js";

 const getCountryInfo = async (req, res) => {

  const country = req.params.country;

  const cacheData = await redisClient.get(country);

  if (cacheData) {
    return res.json({
      source: "redis cache",
      data: JSON.parse(cacheData)
    });
  }

  const response = await axios.get(
    `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${country}`
  );

  await redisClient.set(country, JSON.stringify(response.data), {
    EX: 3600
  });

  res.json({
    source: "wikipedia api",
    data: response.data
  });
};
export default getCountryInfo;