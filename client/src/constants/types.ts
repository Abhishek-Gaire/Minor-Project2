import { LucideIcon } from "lucide-react";
import { z } from "zod";

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
