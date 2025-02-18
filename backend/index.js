import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import courtRoute from "./routes/court.route.js";
import messageRoute from "./routes/message.route.js";
import lawyerRoute from "./routes/lawyer.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// APIs
app.use("/api/v1/user", userRoute);
app.use("/api/v1/court", courtRoute);
app.use("/api/v1/lawyer", lawyerRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/message", messageRoute);

const API_PORT = process.env.API_PORT || 8080;

app.listen(API_PORT, () => {
  connectDB();
  console.log(`API server running on port ${API_PORT}`);
});
