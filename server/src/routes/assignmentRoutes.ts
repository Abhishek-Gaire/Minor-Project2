import express from 'express';
import multer from 'multer';
import { uploadAssignment } from '../controllers/assignmentController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/submit', upload.single('file'), uploadAssignment);

export default router;
