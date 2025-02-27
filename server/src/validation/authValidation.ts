import { z } from "zod";

export const loginSchema = {
    email:z.string().email("Invalid email address"),
    password:z.string().min(12,"Password must be at least 12 characters").min(1,"required"),
    role:z.enum(["Student","Teacher"])
}

export const institutionSchema = {
    name:z.string(),
    contactPerson:z.string(),
    role:z.string(),
    email:z.string().email("Invalid email address"),
    phone:z.string(),
    address:z.string(),
    city:z.string(),
    state:z.string(),
    imageUrl:z.string(),
}

export const adminSchema = {
    email:z.string().email("Invalid email address"),
    password:z.string().min(6,"Password must be at least 6").min(1,"required"),
}
