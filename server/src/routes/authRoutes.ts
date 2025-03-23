import express from "express";
import {
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyUser,
} from "../controllers/authControllers";
import { authenticate } from "../middleware/auth";
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/changePassword", changePassword);
authRouter.get("/verify", authenticate, verifyUser);

export default authRouter;
