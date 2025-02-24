import { Request, Response } from 'express';
import AdminService from '../services/adminService';

export const addStudent = async (req: Request, res: Response) => {
  try {
    const student = await AdminService.addStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add student' });
  }
};
export const getStudents = async (_req: Request, res: Response) => {
    try {
      const students = await AdminService.getStudents();
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  };
