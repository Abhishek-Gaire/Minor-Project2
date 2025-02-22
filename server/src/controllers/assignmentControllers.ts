import { Request, Response } from 'express';
import { submitAssignment } from '../services/assignmentServices';

export const uploadAssignment = async (req: Request, res: Response) => {
  try {
    const { teacherId, title } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'File is required' });

    const result = await submitAssignment(teacherId, title, file);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
