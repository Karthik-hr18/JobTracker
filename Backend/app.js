import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
dotenv.config();

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 1000,
//   message: "Too many requests from this IP, please try again later",
// });

import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import helmet from "helmet";


const app = express();
app.use(helmet())
app.use(cors());
app.use(express.json());
// app.use(limiter);
app.use("/api/user", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL).then(() => {
    console.log("DB Connected Successfully");
    app.listen(PORT, () => {
        console.log(`Listening in port: ${PORT}`)
    });
}).catch((error) => {
    console.log(error)
});


