// src/controllers/student.controller.ts
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomError } from "../utils/customError";
import bcrypt from "bcrypt";

import { studentSchema } from "../../types/schema";

const prisma = new PrismaClient();

// 1. CREATE - Add a new student
export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body
    const validatedData = studentSchema.parse(req.body);

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Format full name
    const fullName = [
      validatedData.firstName,
      validatedData.middleName,
      validatedData.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    // Check if email already exists
    const existingStudent = await prisma.student.findUnique({
      where: { email: validatedData.email },
    });

    if (existingStudent) {
      throw new CustomError("Email already registered", 400);
    }

    // Check if parent email already exists
    const existingParentEmail = await prisma.studentDetails.findFirst({
      where: { parentEmail: validatedData.parentEmail },
    });

    if (existingParentEmail) {
      throw new CustomError("Parent email already registered", 400);
    }

    // Create student and details in a transaction
    const newStudent = await prisma.$transaction(async (tx) => {
      // Create student record
      const student = await tx.student.create({
        data: {
          name: fullName,
          email: validatedData.email,
          password: hashedPassword,
          schoolId: validatedData.schoolId,
          grade: validatedData.grade as any, // Type casting because Prisma expects an enum
          rollNumber: validatedData.rollNumber,
        },
      });

      // Create student details
      await tx.studentDetails.create({
        data: {
          studentId: student.id,
          gender: validatedData.gender.toUpperCase() as any, // Convert to enum format
          dateOfBirth: new Date(validatedData.dateOfBirth),
          section: validatedData.section,
          previousSchool: validatedData.previousSchool,
          academicYear: validatedData.academicYear,
          phone: validatedData.phone,
          alternatePhone: validatedData.alternatePhone,
          address: validatedData.address,
          city: validatedData.city,
          state: validatedData.state,
          zipCode: validatedData.zipCode,
          parentName: validatedData.parentName,
          relationship: validatedData.relationship.toUpperCase() as any, // Convert to enum format
          parentPhone: validatedData.parentPhone,
          parentEmail: validatedData.parentEmail,
          bloodGroup: validatedData.bloodGroup,
          medicalInformation: validatedData.medicalInformation,
          hobbies: validatedData.hobbies,
          extraCurricular: validatedData.extraCurricular,
          additionalNotes: validatedData.additionalNotes,
        },
      });

      return student;
    });

    res.status(201).json({
      status: true,
      message: "Student created successfully",
      data: {
        id: newStudent.id,
        name: newStudent.name,
        email: newStudent.email,
      },
    });
  } catch (error) {
    // Pass error to error handler
    next(error);
  }
};

// 2. READ - Get student by ID with details
export const getStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new CustomError("Student ID is required", 400);
    }

    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        studentDetails: true,
        school: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!student) {
      throw new CustomError("Student not found", 404);
    }

    // Remove password from response
    const { password, ...studentData } = student;

    res.status(200).json({
      status: true,
      message: "Student retrieved successfully",
      data: studentData,
    });
  } catch (error) {
    next(error);
  }
};

// 3. UPDATE - Update student information
export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new CustomError("Student ID is required", 400);
    }

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id },
      include: { studentDetails: true },
    });

    if (!existingStudent) {
      throw new CustomError("Student not found", 404);
    }

    // Partial validation - allow updating only provided fields
    const updateSchema = studentSchema.partial();
    const validatedData = updateSchema.parse(req.body);

    // Check email uniqueness if email is being updated
    if (validatedData.email && validatedData.email !== existingStudent.email) {
      const emailExists = await prisma.student.findUnique({
        where: { email: validatedData.email },
      });

      if (emailExists) {
        throw new CustomError("Email already registered", 400);
      }
    }

    // Check parent email uniqueness if being updated
    if (
      validatedData.parentEmail &&
      existingStudent.studentDetails?.parentEmail !== validatedData.parentEmail
    ) {
      const parentEmailExists = await prisma.studentDetails.findFirst({
        where: {
          parentEmail: validatedData.parentEmail,
          NOT: { studentId: id },
        },
      });

      if (parentEmailExists) {
        throw new CustomError("Parent email already registered", 400);
      }
    }

    // Format name if name components are provided
    let fullName = existingStudent.name;
    if (validatedData.firstName || validatedData.lastName) {
      const firstName =
        validatedData.firstName || existingStudent.name.split(" ")[0];
      const lastName =
        validatedData.lastName ||
        (existingStudent.name.split(" ").length > 1
          ? existingStudent.name.split(" ").slice(1).join(" ")
          : "");
      const middleName = validatedData.middleName || "";

      fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");
    }

    // Hash password if provided
    let hashedPassword = undefined;
    if (validatedData.password) {
      hashedPassword = await bcrypt.hash(validatedData.password, 10);
    }

    // Update student and details in a transaction
    await prisma.$transaction(async (tx) => {
      // Update student record
      await tx.student.update({
        where: { id },
        data: {
          name: fullName,
          email: validatedData.email,
          password: hashedPassword,
          grade: validatedData.grade as any,
          rollNumber: validatedData.rollNumber,
          schoolId: validatedData.schoolId,
        },
      });

      // Only update student details if they exist
      if (
        validatedData.gender ||
        validatedData.dateOfBirth ||
        validatedData.section ||
        validatedData.previousSchool ||
        validatedData.academicYear ||
        validatedData.phone ||
        validatedData.alternatePhone ||
        validatedData.address ||
        validatedData.city ||
        validatedData.state ||
        validatedData.zipCode ||
        validatedData.parentName ||
        validatedData.relationship ||
        validatedData.parentPhone ||
        validatedData.parentEmail ||
        validatedData.bloodGroup ||
        validatedData.medicalInformation ||
        validatedData.hobbies ||
        validatedData.extraCurricular ||
        validatedData.additionalNotes
      ) {
        await tx.studentDetails.update({
          where: { studentId: id },
          data: {
            gender: validatedData.gender?.toUpperCase() as any,
            dateOfBirth: validatedData.dateOfBirth
              ? new Date(validatedData.dateOfBirth)
              : undefined,
            section: validatedData.section,
            previousSchool: validatedData.previousSchool,
            academicYear: validatedData.academicYear,
            phone: validatedData.phone,
            alternatePhone: validatedData.alternatePhone,
            address: validatedData.address,
            city: validatedData.city,
            state: validatedData.state,
            zipCode: validatedData.zipCode,
            parentName: validatedData.parentName,
            relationship: validatedData.relationship?.toUpperCase() as any,
            parentPhone: validatedData.parentPhone,
            parentEmail: validatedData.parentEmail,
            bloodGroup: validatedData.bloodGroup,
            medicalInformation: validatedData.medicalInformation,
            hobbies: validatedData.hobbies,
            extraCurricular: validatedData.extraCurricular,
            additionalNotes: validatedData.additionalNotes,
          },
        });
      }
    });

    res.status(200).json({
      status: true,
      message: "Student updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// 4. DELETE - Remove a student
export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new CustomError("Student ID is required", 400);
    }

    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new CustomError("Student not found", 404);
    }

    // Delete student (will cascade to studentDetails due to onDelete: Cascade in schema)
    await prisma.student.delete({
      where: { id },
    });

    res.status(200).json({
      status: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
