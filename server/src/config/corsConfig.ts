import cors from "cors";
import getLocalIP from "../exceptions/getLocalIP";

const ip = getLocalIP();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    `http://${ip}:5173`,
    // Add any other network URLs you need
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"], // Add Cookie to allowed headers
};

const corsConfig = cors(corsOptions);

export default corsConfig;
export const socketCorsOptions = corsOptions; // for Socket.IO
