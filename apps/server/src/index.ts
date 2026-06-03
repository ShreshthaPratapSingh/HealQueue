import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import queueRoutes from "./routes/queue.routes.js";
import doctorApplicationRoutes from "./routes/doctorApplication.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/doctor-applications", doctorApplicationRoutes);
app.use("/api/adminRoutes", adminRoutes);

app.listen(5000, () => {
    console.log("Server listening on port 5000");
})