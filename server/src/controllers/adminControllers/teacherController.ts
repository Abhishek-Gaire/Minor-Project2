import { Request, Response, NextFunction } from "express";
import { Grade, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  teacherSchema,
  teacherUpdateSchema,
  teacherPasswordSchema,
} from "../../types/schema";
import { CustomError } from "../../exceptions/customError";
import { generatePassword } from "../../utils/password";
import { createMailOptions, sendEmail } from "../../config/nodemailerConfig";

const prisma = new PrismaClient();

// Create a teacher
export const createTeacher = async (
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
    const validatedData = teacherSchema.parse(modifiedBody);

    // Hash password
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Check if email already exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { email: validatedData.email },
    });

    if (existingTeacher) {
      throw new CustomError("Email already registered", 400);
    }

    // Extract teacher details fields
    const {
      address,
      city,
      state,
      zipCode,
      dateOfBirth,
      qualification,
      experience,
      specialization,
      emergencyContact,
      joinDate,
      additionalNotes,
      ...teacherData
    } = validatedData;

    // Create teacher and details in a transaction
    const newTeacher = await prisma.$transaction(async (tx) => {
      const gradeKey = `G${teacherData.grade}` as keyof typeof Grade;

      if (!(gradeKey in Grade)) {
        throw new Error(`Invalid grade: ${teacherData.grade}`);
      }

      // Create teacher record
      const teacher = await tx.teacher.create({
        data: {
          name: teacherData.name,
          email: teacherData.email,
          password: hashedPassword,
          schoolId: admin.schoolId,
          subjects: teacherData.subjects,
          grade: [Grade[gradeKey]],
          phone: teacherData.phone,
          classes: teacherData.classes || 0,
          status: (teacherData.status || "ACTIVE") as any,
          employmentType: (teacherData.employmentType || "FULLTIME") as any,
        },
      });

      // Create teacher details if any detail fields are provided
      if (
        address ||
        city ||
        state ||
        zipCode ||
        dateOfBirth ||
        qualification ||
        experience ||
        specialization ||
        emergencyContact ||
        joinDate ||
        additionalNotes
      ) {
        await tx.teacherDetails.create({
          data: {
            teacherId: teacher.id,
            address,
            city,
            state,
            zipCode,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
            qualification,
            experience,
            specialization,
            emergencyContact,
            joinDate: joinDate ? new Date(joinDate) : null,
            additionalNotes,
          },
        });
      }

      return teacher;
    });

    // Generate HTML email content
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Teacher Account Created</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <tr>
              <td style="background-color: #4CAF50; padding: 30px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome, Teacher!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; color: #333333; line-height: 1.6;">
                <h2 style="color: #4CAF50; font-size: 22px; margin-top: 0;">Your Account is Ready!</h2>
                <p style="font-size: 16px; margin: 0 0 20px;">
                  Congratulations, ${
                    newTeacher.name
                  }! Your teacher account has been successfully created. You can now log in to manage your classes and resources.
                </p>
                <p style="font-size: 16px; margin: 0 0 20px;">
                  Use the temporary password below to log in. For security, please change your password after your first login.
                </p>
                
                <div style="background-color: #e8f5e9; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0;">
                  <p style="font-size: 16px; margin: 0; color: #333333;">Your Password: <strong style="color: #4CAF50;">${generatedPassword}</strong></p>
                  <p style="font-size: 14px; margin: 5px 0 0; color: #666666;">(Change this password after logging in)</p>
                </div>
              
                <div style="text-align: center; margin: 30px 0;">
                  <a href=${process.env
                    .FRONTEND_URL!}/login style="display: inline-block; padding: 14px 30px; background-color: #4CAF50; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px; transition: background-color 0.3s;">Log In Now</a>
                </div>
                <p style="font-size: 16px; margin: 0 0 20px;">
                  Or copy and paste this link into your browser:<br>
                  <a href=${process.env
                    .FRONTEND_URL!}/login style="color: #4CAF50; text-decoration: underline;">${process
      .env.FRONTEND_URL!}/login</a>
                </p>
                </td>
                </tr>
                <tr>
                  <td style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #666666; font-size: 14px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                    <p style="margin: 0;">© 2025 Your School App. All rights reserved.</p>
                  </td>
                </tr>
            </table>
        </body>
        </html>
      `;
      
    // Create email options
    const mailOptions = createMailOptions(
      validatedData.email,
      "Your Teacher Account Has Been Created",
      html
    );

    // Send the email
    const emailResponse = await sendEmail(mailOptions);
    if (!emailResponse) {
      throw new CustomError("Email not sent", 500);
    }

    res.status(201).json({
      status: true,
      message: "Teacher created successfully",
      data: {
        id: newTeacher.id,
        name: newTeacher.name,
        email: newTeacher.email,
      },
    });
  } catch (error) {
    // Pass error to error handler
    next(error);
  }
};

// Get all teachers
export const getAllTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = (req as any).admin;
    if (!admin) {
      throw new CustomError("Not Authorized", 401);
    }
    const teachersRaw = await prisma.teacher.findMany({
      where: {
        schoolId: admin.schoolId,
      },
      include: {
        teacherDetails: true,
      },
    });

    // Remove password manually
    const teachers = teachersRaw.map(({ password, ...rest }) => rest);
    res.status(200).json({
      status: true,
      message: "Teachers retrieved successfully",
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
};

// Get teacher by ID
export const getTeacherById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        teacherDetails: true,
      },
    });

    if (!teacher) {
      throw new CustomError("Teacher not found", 404);
    }

    // Remove password from response
    const { password, ...teacherData } = teacher;

    res.status(200).json({
      status: true,
      message: "Teacher retrieved successfully",
      data: teacherData,
    });
  } catch (error) {
    next(error);
  }
};

// Update teacher
export const updateTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const validatedData = teacherUpdateSchema.parse(req.body);

    // Check if teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id },
      include: { teacherDetails: true },
    });

    if (!existingTeacher) {
      throw new CustomError("Teacher not found", 404);
    }

    // Extract teacher details fields
    const {
      address,
      city,
      state,
      zipCode,
      dateOfBirth,
      qualification,
      experience,
      specialization,
      emergencyContact,
      joinDate,
      additionalNotes,
      ...teacherData
    } = validatedData;

    const cleanedTeacherData = Object.fromEntries(
      Object.entries(teacherData).filter(([_, v]) => v !== undefined)
    );

    // Update teacher and details in a transaction
    await prisma.$transaction(async (tx) => {
      // Update teacher record if there are teacher fields to update
      if (Object.keys(teacherData).length > 0) {
        await tx.teacher.update({
          where: { id },
          data: cleanedTeacherData,
        });
      }

      // Check if any detail fields are provided
      const hasDetailsToUpdate = [
        address,
        city,
        state,
        zipCode,
        dateOfBirth,
        qualification,
        experience,
        specialization,
        emergencyContact,
        joinDate,
        additionalNotes,
      ].some((field) => field !== undefined);

      if (hasDetailsToUpdate) {
        // Prepare the details data object
        const detailsData: any = {};
        if (address !== undefined) detailsData.address = address;
        if (city !== undefined) detailsData.city = city;
        if (state !== undefined) detailsData.state = state;
        if (zipCode !== undefined) detailsData.zipCode = zipCode;
        if (dateOfBirth !== undefined)
          detailsData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
        if (qualification !== undefined)
          detailsData.qualification = qualification;
        if (experience !== undefined) detailsData.experience = experience;
        if (specialization !== undefined)
          detailsData.specialization = specialization;
        if (emergencyContact !== undefined)
          detailsData.emergencyContact = emergencyContact;
        if (joinDate !== undefined)
          detailsData.joinDate = joinDate ? new Date(joinDate) : null;
        if (additionalNotes !== undefined)
          detailsData.additionalNotes = additionalNotes;

        if (existingTeacher.teacherDetails) {
          // Update existing details
          await tx.teacherDetails.update({
            where: { teacherId: id },
            data: detailsData,
          });
        } else {
          // Create new details
          await tx.teacherDetails.create({
            data: {
              teacherId: id,
              ...detailsData,
            },
          });
        }
      }
    });

    // Get updated teacher
    const updatedTeacher = await prisma.teacher.findUnique({
      where: { id },
      include: { teacherDetails: true },
    });

    // Remove password from response
    const { password, ...teacherData2 } = updatedTeacher!;

    res.status(200).json({
      status: true,
      message: "Teacher updated successfully",
      data: teacherData2,
    });
  } catch (error) {
    next(error);
  }
};

// Delete teacher
export const deleteTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Check if teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id },
    });

    if (!existingTeacher) {
      throw new CustomError("Teacher not found", 404);
    }

    // Delete teacher (related details will be deleted due to cascade)
    await prisma.teacher.delete({
      where: { id },
    });

    res.status(200).json({
      status: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Change teacher password
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const validatedData = teacherPasswordSchema.parse(req.body);
    console.log(validatedData);

    // Check if teacher exists
    const teacher = await prisma.teacher.findUnique({
      where: { id },
    });

    if (!teacher) {
      throw new CustomError("Teacher not found", 404);
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      validatedData.currentPassword,
      teacher.password
    );

    if (!isPasswordValid) {
      throw new CustomError("Current password is incorrect", 400);
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10);

    // Update password
    await prisma.teacher.update({
      where: { id },
      data: { password: hashedPassword },
    });

    // Generate HTML email content
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed Successfully</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #4CAF50; padding: 30px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Password Updated!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; color: #333333; line-height: 1.6;">
              <h2 style="color: #4CAF50; font-size: 22px; margin-top: 0;">Dear ${teacher.name},</h2>
              <p style="font-size: 16px; margin: 0 0 20px;">
                Your password has been successfully changed. You can now log in to your teacher account using your new password.
              </p>
              <p style="font-size: 16px; margin: 0 0 20px;">
                For your security, please ensure you keep your new password safe and do not share it with anyone.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href=${process.env.FRONTEND_URI!} style="display: inline-block; padding: 14px 30px; background-color: #4CAF50; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px; transition: background-color 0.3s;">Log In Now</a>
              </div>
              <p style="font-size: 16px; margin: 0 0 20px;">
                Or copy and paste this link into your browser:<br>
                <a href=${process.env.FRONTEND_URI!} style="color: #4CAF50; text-decoration: underline;">${process.env.FRONTEND_URI!}</a>
              </p>
              <p style="font-size: 16px; margin: 0;">
                If you did not initiate this password change, please contact your adminstrator.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f4f4f4; padding: 20px; text-align: center; color: #666666; font-size: 14px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              <p style="margin: 0;">© 2025 Your School App. All rights reserved.</p>
            </td>
          </tr>
          </table>
      </body>
      </html>
    `;

    // Create email options
    const mailOptions = createMailOptions(
      teacher.email,
      "Your Password Has Been Changed",
      html
    );

    // Send the email
    await sendEmail(mailOptions);

    res.status(200).json({
      status: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update teacher status
export const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["ACTIVE", "INACTIVE", "ONLEAVE", "TERMINATED"].includes(status)) {
      throw new CustomError("Invalid status value", 400);
    }

    // Check if teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id },
    });

    if (!existingTeacher) {
      throw new CustomError("Teacher not found", 404);
    }

    // Update status
    await prisma.teacher.update({
      where: { id },
      data: { status: status as any },
    });

    res.status(200).json({
      status: true,
      message: "Teacher status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
