import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

const assignmentSchema = z.object({
  role: z.enum(["Student", "Teacher"]),
  title: z.string().min(3, "Title must be at least 3 characters"),
  fileUrl: z.string().url("Invalid file URL"),
});

const validateAssignment = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // Extract ID from params
    if (!id) {
      return res.status(400).json({ success: false, message: "User ID is required in params" });
    }

    req.body = assignmentSchema.parse(req.body); // Validate request body
    req.params.id = id; // Ensure ID remains in params
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
