import express, { Router } from "express";

import { adminStudentRouter } from "./studentRoutes";
import { adminAuthRouter } from "./authRoutes";
import {
  changePassword,
  updateStatus,
} from "../../controllers/adminControllers/teacherController";

import { verifyAdmin } from "../../middleware/adminAuth";
import { adminTeacherRouter } from "./teacherRoutes";
import { authRateLimiter } from "../../middleware/rateLimiter";

const adminRouter: Router = express.Router();

adminRouter.use(authRateLimiter, adminAuthRouter);
// Protected
adminRouter.use(verifyAdmin);

adminRouter.use(adminStudentRouter);
adminRouter.use(adminTeacherRouter);

adminRouter.put("/teacher/:id/password", changePassword);
adminRouter.patch("/teacher/:id/status", updateStatus);

export default adminRouter;
