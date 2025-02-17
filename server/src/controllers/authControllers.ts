import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../config/supabase';
import dotenv from 'dotenv';
import { UserRole } from '../types/userTypes';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

// **Sign Up**
export const signup = async (req: Request, res: Response) => {
  const { email, password, role }: { email: string; password: string; role: UserRole } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase.from('users').insert([{ email, password: hashedPassword, role }]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'User registered successfully', user: data });
};

// **Login**
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();

  if (error || !data) return res.status(400).json({ error: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, data.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

  const token = jwt.sign({ id: data.id, email: data.email, role: data.role }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
};

// **Forgot Password**
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const { data, error } = await supabase.from('users').select('id').eq('email', email).single();
  if (error || !data) return res.status(400).json({ error: 'User not found' });

  // Here, you can integrate an email service to send a reset link.
  res.json({ message: 'Password reset link sent to your email' });
};

// **Reset Password**
export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const { error } = await supabase.from('users').update({ password: hashedPassword }).eq('email', email);

  if (error) return res.status(400).json({ error: 'Failed to reset password' });

  res.json({ message: 'Password reset successful' });
};
