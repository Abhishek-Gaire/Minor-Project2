import { Request, Response, RequestHandler, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { CustomError } from "../exceptions/customError";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const prisma = new PrismaClient();

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, bodyPassword, role } = req.body;

    if (!email || !bodyPassword || !role) {
      throw new CustomError("Provide All Fields", 400);
    }
    let userExists, isMatch, token;

    if (role === "Student") {
      userExists = await prisma.student.findFirst({ where: { email } });
      if (!userExists) {
        throw new CustomError("Student Not Found", 404);
      }

      isMatch = await bcrypt.compare(bodyPassword, userExists.password);
      if (!isMatch) {
        throw new CustomError("Invalid Credentials", 401);
      }

      token = jwt.sign({ id: userExists.id }, JWT_SECRET, { expiresIn: "24h" });

      res.cookie("studentAccessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV! === "production", // Secure only in production (HTTPS)
        sameSite: process.env.NODE_ENV! === "production" ? "none" : "lax", // Cross-origin in production, lax in development
        path: "/",
      });
    } else {
      userExists = await prisma.teacher.findFirst({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          grade: true,
          password: true,
        },
      });
      if (!userExists) {
        throw new CustomError("Teacher Not Found", 404);
      }

      isMatch = await bcrypt.compare(bodyPassword, userExists.password);
      if (!isMatch) {
        throw new CustomError("Invalid Credentials", 401);
      }

      token = jwt.sign({ id: userExists.id }, JWT_SECRET, { expiresIn: "24h" });

      res.cookie("teacherAccessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV! === "production", // Secure only in production (HTTPS)
        sameSite: process.env.NODE_ENV! === "production" ? "none" : "lax", // Cross-origin in production, lax in development
        path: "/",
      });
    }

    const { password, ...safeUser } = userExists;

    res.status(200).json({
      message: "Login successful",
      accessToken: token,
      data: {
        ...safeUser,
        role: role.toLowerCase(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      throw new CustomError("Provide Both Email and Role", 400);
    }

    let userExists;

    if (role === "Student") {
      userExists = await prisma.student.findFirst({ where: { email } });
    } else {
      userExists = await prisma.teacher.findFirst({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          grade: true,
        },
      });
    }

    if (!userExists) {
      throw new CustomError(`${role} not found`, 404);
    }

    const resetToken = jwt.sign({ id: userExists.id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    // Send email logic (replace with your email service)
    console.log(`Reset token for ${email}: ${resetToken}`);

    res
      .status(200)
      .json({ success: true, message: "Reset link sent", resetToken });
  } catch (error) {
    next(error);
  }
};

export const resetPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, newPassword, role } = req.body;

  if (!token || !newPassword || !role) {
    throw new CustomError("Provide All Fields", 400);
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    let user;

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    if (role === "Student") {
      user = await prisma.student.update({
        where: { id: decoded.id },
        data: { password: hashedPassword }, // Hash password in production
      });
    } else {
      user = await prisma.teacher.update({
        where: { id: decoded.id },
        data: { password: hashedPassword },
      });
    }

    if (!user) {
      throw new CustomError("Password Reset Unsuccessfull", 400);
    }

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

export const changePassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword, role } = req.body;
    const userId = (req as any).user.id; // Extracted from middleware after authentication

    if (!oldPassword || !newPassword || !role) {
      throw new CustomError("Provede All Fields", 400);
    }

    let user;

    if (role === "student") {
      user = await prisma.student.findFirst({ where: { id: userId } });
    } else {
      user = await prisma.teacher.findFirst({ where: { id: userId } });
    }

    if (!user) {
      throw new CustomError(`${role} not found`, 404);
    }

    if (user.password !== oldPassword) {
      throw new CustomError("Incorrect Old Password", 400);
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
  } catch (error) {
    next(error);
  }
};

export const verifyUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as any;
    if (!user) {
      throw new CustomError("Authorization Failed", 401);
    }

    let userDetails;
    const role = (req as any).role;
    if (role === "student") {
      userDetails = await prisma.student.findUnique({
        where: { id: user.id },
      });
    } else if (role === "teacher") {
      userDetails = await prisma.teacher.findUnique({
        where: { id: user.id },
      });
    } else {
      userDetails = null;
    }

    if (!userDetails) {
      throw new CustomError("User Not Found", 404);
    }
    res.status(200).json({
      success: true,
      message: "User Verified Successfully",
      data: {
        ...userDetails,
        role,
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};

// User Logout Controller (for students and teachers)
export const userLogout: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = (req as any).role;

    // Clear appropriate cookie based on role
    if (role === "student") {
      res.clearCookie("studentAccessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV! === "production", // Secure only in production (HTTPS)
        sameSite: process.env.NODE_ENV! === "production" ? "none" : "lax", // Cross-origin in production, lax in development
        path: "/",
      });
    } else if (role === "teacher") {
      res.clearCookie("teacherAccessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV! === "production", // Secure only in production (HTTPS)
        sameSite: process.env.NODE_ENV! === "production" ? "none" : "lax", // Cross-origin in production, lax in development
        path: "/",
      });
    } else {
      throw new CustomError("Role not supported", 400);
    }

    res.status(200).json({
      success: true,
      message: `${role} logged out successfully`,
    });
  } catch (error) {
    next(error);
  }
};
