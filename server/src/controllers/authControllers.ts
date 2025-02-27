import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../config/supabase";
import dotenv from "dotenv";
import { Prisma, PrismaClient } from "@prisma/client";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const prisma = new PrismaClient();

// **Login For Student and Teacher
export const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    res.status(401).json({
      success: false,
      message: "Provide all the fields",
    });
    return;
  }
  let userExists, isMatch, token;

  if (role === "Student") {
    userExists = await prisma.student.findFirst({ where: { email } });
    if (!userExists) {
      res.status(404).json({
        success: false,
        message: "Student Not Found",
      });
      return;
    }
    isMatch = password === userExists.password;

    // isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }
  } else {
    userExists = await prisma.teacher.findFirst({ where: { email } });
    if (!userExists) {
      res.status(404).json({
        success: false,
        message: "Teacher Not Found",
      });
      return;
    }
    isMatch = password === userExists.password;
    // isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }
  }
  token = jwt.sign({ id: userExists.id }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true, // Use HTTPS
    sameSite: "none", // Required for cross-origin requests
  });

  res.status(200).json({
    message: "Login successful",
    accessToken: token,
    data: {
      userExists,
    },
  });
  return;
};

export const forgotPassword: RequestHandler = async (req: Request, res: Response) => {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ success: false, message: "Provide email and role" });
  }

  let userExists;

  if (role === "Student") {
    userExists = await prisma.student.findFirst({ where: { email } });
  } else {
    userExists = await prisma.teacher.findFirst({ where: { email } });
  }

  if (!userExists) {
    return res.status(404).json({ success: false, message: `${role} not found` });
  }

  const resetToken = jwt.sign({ id: userExists.id }, JWT_SECRET, { expiresIn: "15m" });

  // Send email logic (replace with your email service)
  console.log(`Reset token for ${email}: ${resetToken}`);

  return res.status(200).json({ success: true, message: "Reset link sent", resetToken });
};
export const resetPassword: RequestHandler = async (req: Request, res: Response) => {
  const { token, newPassword, role } = req.body;

  if (!token || !newPassword || !role) {
    return res.status(400).json({ success: false, message: "Provide all fields" });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    let user;

    if (role === "Student") {
      user = await prisma.student.update({
        where: { id: decoded.id },
        data: { password: newPassword }, // Hash password in production
      });
    } else {
      user = await prisma.teacher.update({
        where: { id: decoded.id },
        data: { password: newPassword },
      });
    }

    return res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};
export const changePassword: RequestHandler = async (req: Request, res: Response) => {
  const { oldPassword, newPassword, role } = req.body;
  const userId = (req as any).user.id; // Extracted from middleware after authentication

  if (!oldPassword || !newPassword || !role) {
    return res.status(400).json({ success: false, message: "Provide all fields" });
  }

  let user;

  if (role === "Student") {
    user = await prisma.student.findFirst({ where: { id: userId } });
  } else {
    user = await prisma.teacher.findFirst({ where: { id: userId } });
  }

  if (!user) {
    return res.status(404).json({ success: false, message: `${role} not found` });
  }

  if (user.password !== oldPassword) {
    return res.status(401).json({ success: false, message: "Incorrect old password" });
  }

  await prisma[role.toLowerCase()].update({
    where: { id: userId },
    data: { password: newPassword },
  });

  return res.status(200).json({ success: true, message: "Password changed successfully" });
};
