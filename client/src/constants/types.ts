import { LucideIcon } from "lucide-react";
import { z } from "zod";
import React from "react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export type NavItem = {
  name: string;
  to: string;
  icon: React.ElementType;
};

export interface RegistrationFormProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const institutionFormSchema = z.object({
  institutionName: z
    .string()
    .min(2, "Institution name must be at least 2 characters."),
  contactName: z.string().min(2, "Contact name must be at least 2 characters."),
  role: z.string().min(2, "Role must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  mainImage: z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= 10 * 1024 * 1024,
      "File size must be under 10MB."
    )
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "Only image files are allowed."
    ),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.enum(["Student", "Teacher"], { message: "Role is required." }),
});

export interface Message {
  id: number;
  sender: string;
  receiver: string;
  content: string;
  timestamp?: string;
  delivered?: boolean;
  isSelf?: boolean;
}

export interface Student {
  name: string;
  id: string;
  email: string;
  schoolId: string;
  createdAt: Date;
  grade: string; // Assuming $Enums.Grade is a string (replace with actual type if needed)
  rollNumber: string | null;
}

export interface Conversation {
  id: number;
  sender: string;
  content: string;
  conversationId: string;
  receiver: string;
  timeStamp: Date;
  delivered: boolean;
}

export interface ClassMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  class?: string;
}

// Define the schema for form validation

export const classFormSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    startTime: z.string().min(1, { message: "Start time is required" }),
    endTime: z.string().min(1, { message: "End time is required" }),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);

    if (end <= start) {
      ctx.addIssue({
        path: ["endTime"],
        message: "End time must be after start time",
        code: z.ZodIssueCode.custom,
      });
    }
  });

// Create a TypeScript type from the Zod schema
export type ClassFormData = z.infer<typeof classFormSchema>;

export interface Participant {
  id: string | number;
  name: string;
  isSpeaking: boolean;
  videoEnabled: boolean;
  audioEnabled: boolean;
  isScreenSharing?: boolean;
  isTeacher?: boolean;
}

export const studentFormSchema = z.object({
  // Personal Details
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string(),

  // Academic Details
  grade: z.enum(["5", "6", "7", "8", "9", "10"]),
  section: z.string().min(1, "Section is required"),
  rollNumber: z.string().optional(),
  previousSchool: z.string().optional(),
  academicYear: z.string().min(4, "Please enter a valid academic year"),

  // Contact Information
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  alternatePhone: z.string().optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),

  // Parent/Guardian Information
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  relationship: z.enum(["mother", "father", "guardian", "other"]),
  parentPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  parentEmail: z.string().email("Please enter a valid email address"),

  // Additional Information
  bloodGroup: z.string().optional(),
  medicalInformation: z.string().optional(),
  hobbies: z.string().optional(),
  extraCurricular: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export const teacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  phone: z.string().optional(),
  classes: z.number().int().min(0).optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "ONLEAVE", "TERMINATED"]).optional(),
  employmentType: z
    .enum(["FULLTIME", "PARTTIME", "CONTRACT", "TEMPORARY"])
    .optional(),

  // Optional TeacherDetails fields
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  dateOfBirth: z.string().optional(), // Will be converted to Date
  qualification: z.string().optional(),
  experience: z.number().int().min(0).optional(),
  specialization: z.string().optional(),
  emergencyContact: z.string().optional(),
  joinDate: z.string().optional(), // Will be converted to Date
  additionalNotes: z.string().optional(),
});
