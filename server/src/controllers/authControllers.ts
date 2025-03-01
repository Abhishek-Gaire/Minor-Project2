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

export const forgotPassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, role } = req.body;

  if (!email || !role) {
    res.status(400).json({ success: false, message: "Provide email and role" });
    return;
  }

  let userExists;

  if (role === "Student") {
    userExists = await prisma.student.findFirst({ where: { email } });
  } else {
    userExists = await prisma.teacher.findFirst({ where: { email } });
  }

  if (!userExists) {
    res.status(404).json({ success: false, message: `${role} not found` });
    return;
  }

  const resetToken = jwt.sign({ id: userExists.id }, JWT_SECRET, {
    expiresIn: "15m",
  });

  // Send email logic (replace with your email service)
  console.log(`Reset token for ${email}: ${resetToken}`);

  res
    .status(200)
    .json({ success: true, message: "Reset link sent", resetToken });
  return;
};

export const resetPassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { token, newPassword, role } = req.body;

  if (!token || !newPassword || !role) {
    res.status(400).json({ success: false, message: "Provide all fields" });
    return;
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

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
    return;
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid or expired token" });
    return;
  }
};

export const changePassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { oldPassword, newPassword, role } = req.body;
  const userId = (req as any).user.id; // Extracted from middleware after authentication

  if (!oldPassword || !newPassword || !role) {
    res.status(400).json({ success: false, message: "Provide all fields" });
    return;
  }

  let user;

  if (role === "Student") {
    user = await prisma.student.findFirst({ where: { id: userId } });
  } else {
    user = await prisma.teacher.findFirst({ where: { id: userId } });
  }

  if (!user) {
    res.status(404).json({ success: false, message: `${role} not found` });
    return;
  }

  if (user.password !== oldPassword) {
    res.status(401).json({ success: false, message: "Incorrect old password" });
    return;
  }
  const tableName = role.toLowerCase();
  const model = prisma[tableName] as any;

  await model.update({
    where: { id: userId },
    data: { password: newPassword },
  });

  res
    .status(200)
    .json({ success: true, message: "Password changed successfully" });
  return;
};

export const verifyUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { user } = req as any;
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User Verified Successfully",
      user,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
    return;
  }
};
