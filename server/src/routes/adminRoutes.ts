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