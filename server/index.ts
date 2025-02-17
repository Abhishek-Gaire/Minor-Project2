<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

=======
import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
>>>>>>> 9adc6fb31a7ac5b39903b70c8e7ae16ad53d979b
const app = express();
app.use(express.json());
app.use(cors());
<<<<<<< HEAD

app.use('/auth', authRoutes);

=======
app.use(express.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the backend!");
});

// Start the server
>>>>>>> 9adc6fb31a7ac5b39903b70c8e7ae16ad53d979b
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
