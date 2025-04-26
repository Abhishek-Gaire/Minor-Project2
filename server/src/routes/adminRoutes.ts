import express, { Router } from "express";

import {
  adminLogin,
  adminResetPassword,
  adminForgotPassword,
  adminChangePassword,
  adminVerify,
  adminLogout,
} from "../controllers/adminControllers/authController";

import {
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  getAllStudents
} from "../controllers/adminControllers/studentControllers";

import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  changePassword,
  updateStatus,
} from "../controllers/adminControllers/teacherController";

import { verifyAdmin } from "../middleware/authMiddleware";

const adminRouter: Router = express.Router();

// Public
adminRouter.post("/login", adminLogin);
adminRouter.post("/forgot-password", adminForgotPassword);
adminRouter.post("/reset-password", adminResetPassword);

// Protected
adminRouter.use(verifyAdmin);

adminRouter.route("/student")
.post(createStudent)
.get(getAllStudents);

adminRouter
  .route("/student/:id")
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

adminRouter.route("/teacher")
  .post(createTeacher)
  .get(getAllTeachers);

adminRouter
  .route("/teacher/:id")
  .get(getTeacherById)
  .put(updateTeacher)
  .delete(deleteTeacher);

adminRouter.put("/teacher/:id/password", changePassword);
adminRouter.patch("/teacher/:id/status", updateStatus);

adminRouter.post("/change-password", adminChangePassword);
adminRouter.get("/verify", adminVerify);
adminRouter.post("/logout", adminLogout);
export default adminRouter;
