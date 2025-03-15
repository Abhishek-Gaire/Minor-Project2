import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string(),
  grade: z.enum(["5", "6", "7", "8", "9", "10"]),
  section: z.string().min(1, "Section is required"),
  rollNumber: z.string().optional(),
  previousSchool: z.string().optional(),
  academicYear: z.string().min(4, "Please enter a valid academic year"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  alternatePhone: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  relationship: z.enum(["mother", "father", "guardian", "other"]),
  parentPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  parentEmail: z.string().email("Please enter a valid email address"),
  bloodGroup: z.string().optional(),
  medicalInformation: z.string().optional(),
  hobbies: z.string().optional(),
  extraCurricular: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export const addStudent = async (req: Request, res: Response) => {
  try {
    const validatedData = formSchema.parse(req.body);

    const student = await prisma.student.create({
      data: validatedData,
    });

    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(400).json({ message: "Database error", error: error.message });
    }
    res.status(500).json({ message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" });
  }
};
