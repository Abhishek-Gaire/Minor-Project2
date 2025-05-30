import express, { Router } from "express";

import {
  createAssignment,
  deleteAssignment,
  getAssignments,
  getAssignmentById,
  getSubmissions,
  gradeSubmission,
  submitAssignment,
  updateAssignment,
  getSubmissionsByStudentsId,
} from "../controllers/assignmentControllers";

const router: Router = express.Router();

router.post("/create", createAssignment);
router.get("/get", getAssignments);
router.get("/get/:id", getAssignmentById);
router.put("/update/:id", updateAssignment);
router.delete("/delete/:id", deleteAssignment);
router.post("/submit", submitAssignment);
router.get("/submissions/:assignmentId", getSubmissions);
router.post("/grade/:assignmentId", gradeSubmission);
router.get("/grades/:studentId", getSubmissionsByStudentsId);

export default router;
