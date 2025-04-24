import express from "express";
import {
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyUser,
  userLogout
} from "../controllers/authControllers";
import { authenticate } from "../middleware/auth";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);

// Protected
authRouter.use(authenticate);

authRouter.post("/change-password", changePassword);
authRouter.get("/verify", verifyUser);
authRouter.post("/logout", userLogout);

export default authRouter;