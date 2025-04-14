import { z } from "zod";

// Define form schema using Zod
export const studentSchema = z.object({
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

  // Auth & School
  password: z.string().min(6, "Password must be at least 6 characters"),
  schoolId: z.string().uuid("Invalid school ID"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .min(1, "required"),
  role: z.enum(["Student", "Teacher"]),
});

export const institutionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  contactPerson: z
    .string()
    .min(2, "Contact name must be at least 2 characters."),
  role: z.string().email("Invalid email address."),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  imageUrl: z.string(),
});

export const adminSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6").min(1, "required"),
});

// Teacher creation schema
export const teacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  schoolId: z.string(),
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

// Teacher update schema
export const teacherUpdateSchema = teacherSchema
  .partial()
  .omit({ password: true });

// Teacher password update schema
export const teacherPasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Teacher login schema
export const teacherLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});

export const assignmentSchema = {
  id: z.string().min(1, "User ID is required"),
  role: z.enum(["Student", "Teacher"]),
  title: z.string().min(3, "Title must be at least 3 characters"),
  fileUrl: z.string().url("Invalid file URL"),
};
