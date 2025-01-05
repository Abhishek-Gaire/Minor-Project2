import { Request, Response } from 'express';
import { getAllUsers, saveUser } from '../services/userService.ts';

// Controller for getting all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller for creating a new user
export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const newUser = await saveUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
