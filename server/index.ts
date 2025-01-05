import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();

// Middlewares
app.use(cors());
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
