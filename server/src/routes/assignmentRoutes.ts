import express from 'express';
// import multer from 'multer';
import { createAssignMent, deleteAssignment, getAssignments, getAssignmentById, getSubmissions, gradeSubmission, submitAssignment, updateAssignment } from '../controllers/assignmentControllers';

const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', createAssignMent);
router.get('/get', getAssignments);
router.get('/get/:id', getAssignmentById);
router.put('/update/:id', updateAssignment);
router.delete('/:id', deleteAssignment);
router.post('/submit', submitAssignment);
router.get('/submissions/:assignmentId', getSubmissions);
router.post('/grade/:assignmentId', gradeSubmission);
export default router;
