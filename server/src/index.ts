import express from "express";

import authRoutes from "./routes/authRoutes";
import schoolRoutes from "./routes/institutionalRoutes";

import cookieParser from "cookie-parser";

const app = express();

import corsConfig from "./config/corsConfig";
app.use(corsConfig);

app.use(express.json()); // To parse JSON bodies
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/schools", schoolRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
