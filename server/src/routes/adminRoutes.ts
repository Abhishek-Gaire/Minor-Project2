import express from "express";
import {
  login,
  // forgotPassword,
  // resetPassword,
} from "../controllers/authControllers";

const router = express.Router();

router.post("/login", login);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

export default router;
// src/routes/student.routes.ts
import express from 'express';
import { createStudent, getStudent, updateStudent, deleteStudent } from '../controllers/student.controller';
import { authenticateUser } from '../middleware/auth'; // Assuming you have auth middleware

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateUser);

// CRUD Routes
router.post('/', createStudent);
router.get('/:id', getStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
import express from 'express';
import { 
  createTeacher, 
  getAllTeachers, 
  getTeacherById, 
  updateTeacher, 
  deleteTeacher,
  changePassword,
  updateStatus
} from '../controllers/teacherController';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = express.Router();

// Public routes
router.post('/', createTeacher);

// Protected routes
router.get('/', authenticate, authorize(['ADMIN']), getAllTeachers);
router.get('/:id', authenticate, authorize(['ADMIN', 'TEACHER']), getTeacherById);
router.put('/:id', authenticate, authorize(['ADMIN', 'TEACHER']), updateTeacher);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteTeacher);
router.put('/:id/password', authenticate, authorize(['ADMIN', 'TEACHER']), changePassword);
router.patch('/:id/status', authenticate, authorize(['ADMIN']), updateStatus);

export default router;