import express from 'express';
import multer from 'multer';
import { registerInstitutionHandler } from '../controllers/institutionController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/register', upload.array('images', 5), registerInstitutionHandler);

export default router;
