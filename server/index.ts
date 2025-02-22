import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes';
import assignmentRoutes from './src/routes/assignmentRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', userRoutes);
app.use('/assignments', assignmentRoutes); // New route for assignments
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
