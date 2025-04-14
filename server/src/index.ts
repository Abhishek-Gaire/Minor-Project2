import express from "express";
import morgan from "morgan";
import { Server, Socket } from "socket.io";
import http from "http";

import { errorHandler } from "./middleware/errorHandler";

import authRoutes from "./routes/authRoutes";
import schoolRoutes from "./routes/institutionalRoutes";
import messageRoutes from "./routes/messageRoutes";
import classChatRouter from "./routes/classChatRoutes";
import adminRouter from "./routes/adminRoutes";
import corsConfig, { socketCorsOptions } from "./config/corsConfig";
import getLocalIP from "./exceptions/getLocalIP";

import cookieParser from "cookie-parser";

const app = express();
const server = http.createServer(app);
app.use(corsConfig);

const io = new Server(server, {
  cors: socketCorsOptions,
});

// Add Morgan middleware before routes
app.use(morgan("dev")); // Logs in format: :method :url :status :response-time ms

app.use(express.json()); // To parse JSON bodies
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/schools", schoolRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/classMessages", classChatRouter);
app.use("/api/v1/admin", adminRouter);

app.use(errorHandler);

// Run when the client connects using socket.io client
io.on("connection", (socket: Socket) => {
  console.log("New Connection", socket.id);

  // Join Room
  socket.on("joinRoom", async () => {});
});

// Start the server
const PORT = Number(process.env.PORT) || 5000;
const IP = getLocalIP();
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on:`);
  console.log(`- Local: http://localhost:${PORT}`);
  console.log(`- Network: http://${IP}:${PORT}`);
});
