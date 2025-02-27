import { z } from "zod";

export const assignmentSchema = {
  id: z.string().min(1, "User ID is required"),
  role: z.enum(["Student", "Teacher"]),
  title: z.string().min(3, "Title must be at least 3 characters"),
  fileUrl: z.string().url("Invalid file URL"),
};
