import express, { Router } from "express";
import { login } from "../controllers/adminControllers/authController";

import {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
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

// Apply authentication middleware to all routes
adminRouter.use(verifyAdmin);

adminRouter.post("/student/create", createStudent);
adminRouter
  .route("/student/:id")
  .get(getStudent)
  .put(updateStudent)
  .delete(deleteStudent);
adminRouter.post("/login", login);
adminRouter.post("/teacher/create", createTeacher);
adminRouter.get("/teacher", getAllTeachers);
adminRouter
  .route("/teacher/:id")
  .get(getTeacherById)
  .put(updateTeacher)
  .delete(deleteTeacher);

adminRouter.put("/teacher/:id/password", changePassword);
adminRouter.patch("/teacher/:id/status", updateStatus);

export default adminRouter;
