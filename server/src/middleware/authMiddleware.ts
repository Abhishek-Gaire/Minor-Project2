import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyAdmin = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.adminToken;

  if (!token) {
    res
      .status(401)
      .json({ succcess: false, message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.admin = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
