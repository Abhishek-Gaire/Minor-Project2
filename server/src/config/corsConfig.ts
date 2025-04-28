import cors from "cors";
import getLocalIP from "../exceptions/getLocalIP";
import dotenv from "dotenv";

const ip = getLocalIP();
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL;
const corsOptions = {
  origin: [
    "http://localhost:5173",
    `http://${ip}:5173`,
    `${FRONTEND_URL}`
    // Add any other network URLs you need
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"], // Add Cookie to allowed headers
};

const corsConfig = cors(corsOptions);

export default corsConfig;
export const socketCorsOptions = corsOptions; // for Socket.IO
