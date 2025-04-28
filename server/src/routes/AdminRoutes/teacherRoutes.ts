import express, { Router } from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../../controllers/adminControllers/teacherController";

const adminTeacherRoutes: Router = express.Router();

adminTeacherRoutes.route("/teacher").post(createTeacher).get(getAllTeachers);

adminTeacherRoutes
  .route("/teacher/:id")
  .get(getTeacherById)
  .put(updateTeacher)
  .delete(deleteTeacher);

export { adminTeacherRoutes as adminTeacherRouter };
