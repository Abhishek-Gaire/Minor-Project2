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

// // **Forgot Password**
// export const forgotPassword: RequestHandler = async (
//   req: Request,
//   res: Response
// ) => {
//   const { email } = req.body;

//   const { data, error } = await supabase
//     .from("users")
//     .select("id")
//     .eq("email", email)
//     .single();
//   if (error || !data) {
//     res.status(400).json({ error: "User not found" });
//     return;
//   }

//   // Here, you can integrate an email service to send a reset link.
//   res.json({ message: "Password reset link sent to your email" });
//   return;
// };

// // **Reset Password**
// export const resetPassword: RequestHandler = async (
//   req: Request,
//   res: Response
// ) => {
//   const { email, newPassword } = req.body;

//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   const { error } = await supabase
//     .from("users")
//     .update({ password: hashedPassword })
//     .eq("email", email);

//   if (error) {
//     res.status(400).json({ error: "Failed to reset password" });
//     return;
//   }

//   res.json({ message: "Password reset successful" });
//   return;
// };
