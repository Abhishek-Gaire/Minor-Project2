export interface StudentType {
    name: string;
    age: number;
    class: string;
    feesPaid: boolean;
  }
  import { z } from 'zod';

// Teacher creation schema
export const teacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  phone: z.string().optional(),
  classes: z.number().int().min(0).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ONLEAVE', 'TERMINATED']).optional(),
  employmentType: z.enum(['FULLTIME', 'PARTTIME', 'CONTRACT', 'TEMPORARY']).optional(),
  
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
export const teacherUpdateSchema = teacherSchema.partial().omit({ password: true });

// Teacher password update schema
export const teacherPasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters")
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Teacher login schema
export const teacherLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string()
});