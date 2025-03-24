import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { assignmentSchema } from "../schemas"; // Import validation schema

const validateAssignment = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = z.object(assignmentSchema).parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default validateAssignment;
