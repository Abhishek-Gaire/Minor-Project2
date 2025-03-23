import { z } from "zod";

export const loginSchema = {
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .min(1, "required"),
  role: z.enum(["Student", "Teacher"]),
};

export const institutionSchema = {
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
};

export const adminSchema = {
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6").min(1, "required"),
};
