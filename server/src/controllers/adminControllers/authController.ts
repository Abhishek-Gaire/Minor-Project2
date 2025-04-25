import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const prisma = new PrismaClient();

// Admin Login
export const adminLogin: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({
      success: false,
      message: "Please provide email and password",
    });
    return;
  }

  try {
    // Find admin by email
    const adminExists = await prisma.admin.findFirst({ where: { email } });

    if (!adminExists) {
      res.status(404).json({
        success: false,
        message: "Admin not found",
      });
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, adminExists.password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: adminExists.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    // Set HTTP-only cookie
    res.cookie("adminAccessToken", token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
      path: "/",
    });

    // Return success response
    res.status(200).json({
      message: "Admin login successful",
      accessToken: token,
      data: {
        ...adminExists,
        role: "Admin",
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const adminForgotPassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: "Please provide email" });
    return;
  }

  try {
    const adminExists = await prisma.admin.findFirst({ where: { email } });

    if (!adminExists) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    const resetToken = jwt.sign({ id: adminExists.id }, JWT_SECRET, {
      expiresIn: "15m",
    });

    // Send email logic (replace with your email service)
    console.log(`Admin reset token for ${email}: ${resetToken}`);

    res
      .status(200)
      .json({
        success: true,
        message: "Reset link sent to your email",
        resetToken,
      });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const adminResetPassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res
      .status(400)
      .json({
        success: false,
        message: "Please provide token and new password",
      });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    await prisma.admin.update({
      where: { id: decoded.id },
      data: { password: newPassword }, // Hash password in production
    });

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const adminChangePassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { oldPassword, newPassword } = req.body;
  const adminId = (req as any).user.id; // Extracted from middleware after authentication

  if (!oldPassword || !newPassword) {
    res
      .status(400)
      .json({
        success: false,
        message: "Please provide old and new passwords",
      });
    return;
  }

  try {
    const admin = await prisma.admin.findFirst({ where: { id: adminId } });

    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    if (admin.password !== oldPassword) {
      res
        .status(401)
        .json({ success: false, message: "Incorrect old password" });
      return;
    }

    await prisma.admin.update({
      where: { id: adminId },
      data: { password: newPassword }, // Hash password in production
    });

    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const adminVerify: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { admin } = req as any;

    if (!admin) {
      res.status(404).json({
        success: false,
        message: "Authorization failed",
      });
      return;
    }

    const adminDetails = await prisma.admin.findUnique({
      where: { id: admin.id },
    });

    if (!adminDetails) {
      res.status(404).json({
        success: false,
        message: "Admin not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Admin verified successfully",
      data: {
        ...adminDetails,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Admin Logout Controller
export const adminLogout: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    // Clear the admin access token cookie
    res.clearCookie("adminAccessToken", {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
