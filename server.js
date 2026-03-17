import express from "express";

import countryRoutes from "./routes/countryRoutes.js";
const app = express()

app.use("/country",countryRoutes)

app.listen(5000,()=>{
console.log("Server running on port 5000")
})