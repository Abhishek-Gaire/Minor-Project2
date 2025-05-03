import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
  user?: any;
  role?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies.studentAccessToken || req.cookies.teacherAccessToken;
    
  if (!token) {
    res
      .status(401)
      .json({ succcess: false, message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    req.role = req.cookies.studentAccessToken ? "student" : "teacher";
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Invalid token" });
    return;
  }
};
