import express, { Router } from "express";

import {
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  getAllStudents,
} from "../../controllers/adminControllers/studentControllers";

const adminStudentRoutes: Router = express.Router();

adminStudentRoutes.route("/student")
    .post(createStudent)
    .get(getAllStudents);

adminStudentRoutes
  .route("/student/:id")
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

export { adminStudentRoutes as adminStudentRouter };
