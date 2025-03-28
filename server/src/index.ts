import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes";
import schoolRoutes from "./routes/institutionalRoutes";
import messageRoutes from "./routes/messageRoutes";
import classChatRouter from "./routes/classChatRoutes";

import cookieParser from "cookie-parser";

const app = express();

// Add Morgan middleware before routes
app.use(morgan("dev")); // Logs in format: :method :url :status :response-time ms

import corsConfig from "./config/corsConfig";
import getLocalIP from "./exceptions/getLocalIP";
app.use(corsConfig);

app.use(express.json()); // To parse JSON bodies
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/schools", schoolRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/classMessages", classChatRouter);
// Start the server
const PORT = Number(process.env.PORT) || 5000;
const IP = getLocalIP();
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on:`);
  console.log(`- Local: http://localhost:${PORT}`);
  console.log(`- Network: http://${IP}:${PORT}`);
});
