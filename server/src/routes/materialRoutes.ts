import express from 'express';
import { 
  createMaterials, 
  getMaterials, 
  deleteMaterial 
} from '../controllers/studyMaterialsControllers';
import { authenticate } from '../middleware/dashboardAuth';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Routes that require teacher role
router.post('/materials', createMaterials);
router.delete('/materials/:id',deleteMaterial);

// Routes accessible to all authenticated users
router.get('/materials', getMaterials);

export  {router as materialsRouter};