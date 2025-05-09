import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomError } from "../../exceptions/customError";
import bcrypt from "bcrypt";

import { studentSchema } from "../../types/schema";
import { generatePassword } from "../../utils/password";
import { createMailOptions, sendEmail } from "../../config/nodemailerConfig";

const prisma = new PrismaClient();

// 1. CREATE - Add a new student
export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = (req as any).admin;
    if (!admin) {
      throw new CustomError("Unauthorized", 401);
    }

    // Generate random password
    const generatedPassword = generatePassword(12);

    // Add schoolId and generatedPassword into req.body
    const modifiedBody = {
      ...req.body,
      schoolId: admin.schoolId,
      password: generatedPassword,
    };

    // Validate request body
    const validatedData = studentSchema.parse(modifiedBody);

    // Hash password
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

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
          grade: `G${validatedData.grade}` as any,
          rollNumber: validatedData.rollNumber,
        },
      });

      // Create student details
      await tx.studentDetails.create({
        data: {
          studentId: student.id,
          gender: validatedData.gender as any, // Convert to enum format
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
          relationship: validatedData.relationship as any, // Convert to enum format
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

    if (!newStudent) {
      throw new CustomError("Failed to create student", 500);
    }

    const subject = "You are Registered as Student. Login to your account";
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Student Registration Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                  <td style="background-color: #2196F3; padding: 30px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome, ${newStudent.name}!</h1>
                  </td>
              </tr>
              <!-- Body -->
              <tr>
                  <td style="padding: 30px; color: #333333; line-height: 1.6;">
                      <h2 style="color: #2196F3; font-size: 22px; margin-top: 0;">You’re Successfully Registered!</h2>
                      <p style="font-size: 16px; margin: 0 0 20px;">
                          Congratulations! Your account has been created, and you’re ready to start your learning journey with us.
                      </p>
                      <p style="font-size: 16px; margin: 0 0 20px;">
                          Use the button below to log in to your account and explore your student dashboard.
                      </p>
                      <!-- Password Display -->
                      <div style="background-color: #e3f2fd; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0;">
                          <p style="font-size: 16px; margin: 0; color: #333333;">Your Password: <strong style="color: #2196F3;">${generatedPassword}</strong></p>
                          <p style="font-size: 14px; margin: 5px 0 0; color: #666666;">(Please change your password after logging in for security)</p>
                      </div>
                      <!-- Login Button -->
                      <div style="text-align: center; margin: 30px 0;">
                          <a href=${process.env.FRONTEND_URL!}/login target="_blank" style="display: inline-block; padding: 14px 30px; background-color: #2196F3; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px; transition: background-color 0.3s;">Log In Now</a>
                      </div>
                      <p style="font-size: 16px; margin: 0 0 20px;">
                          Or copy and paste this link into your browser:<br>
                          <a href=${process.env.FRONTEND_URL!}/login target="_blank" style="color: #2196F3; text-decoration: underline;">${process.env.FRONTEND_URL!}/login</a>
                      </p>
                  </td>
              </tr>
              <!-- Footer -->
              <tr>
                  <td style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #666666; font-size: 14px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                      <p style="margin: 0;">&copy; 2025 Your School App. All rights reserved.</p>
                  </td>
              </tr>
          </table>
      </body>
      </html>`;
    const mailOptions = createMailOptions(validatedData.email, subject, html);
    
    const sendMail = await sendEmail(mailOptions);
    if (!sendMail) {
      throw new CustomError("Failed to send email", 500);
    }

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

// 1.5. READ - Get all students for the admin's school
export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = (req as any).admin;
    if (!admin) {
      throw new CustomError("Unauthorized", 401);
    }

    const students = await prisma.student.findMany({
      where: { schoolId: admin.schoolId },
      select: {
        id: true,
        name: true,
        email: true,
        grade: true,
        rollNumber: true,
        studentDetails: {
          select: {
            phone: true,
            section: true,
            academicYear: true,
            gender: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    res.status(200).json({
      status: true,
      message: "Students retrieved successfully",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// 2. READ - Get student by ID with details
export const getStudentById = async (
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
            schoolName: true,
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

    // Update student and details in a transaction
    await prisma.$transaction(async (tx) => {
      // Update student record
      await tx.student.update({
        where: { id },
        data: {
          name: fullName,
          email: validatedData.email,
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
