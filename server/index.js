import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import UserRouter from "./routes/user.route.js";
import InterviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";

dotenv.config();
const app = express();
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/user",UserRouter)
app.use("/api/interview",InterviewRouter)
app.use("/api/payment",paymentRouter)

const PORT = process.env.PORT || 8000; // Fallback to 8000 if not specified in .env

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});