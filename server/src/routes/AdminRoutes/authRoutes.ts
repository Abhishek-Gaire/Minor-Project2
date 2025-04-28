import express, { Router } from "express";

import {
  adminLogin,
  adminResetPassword,
  adminForgotPassword,
  adminChangePassword,
  adminVerify,
  adminLogout,
} from "../../controllers/adminControllers/authController";
import { verifyAdmin } from "../../middleware/adminAuth";

const adminAuthRoutes: Router = express.Router();

// Public
adminAuthRoutes.post("/forgot-password", adminForgotPassword);
adminAuthRoutes.post("/reset-password", adminResetPassword);
adminAuthRoutes.post("/login", adminLogin);

adminAuthRoutes.use(verifyAdmin);

adminAuthRoutes.post("/change-password", adminChangePassword);
adminAuthRoutes.get("/verify", adminVerify);
adminAuthRoutes.post("/logout", adminLogout);

export { adminAuthRoutes as adminAuthRouter };
