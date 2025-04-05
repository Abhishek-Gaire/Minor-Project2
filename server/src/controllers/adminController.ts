// src/controllers/student.controller.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomError } from '../utils/customError';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define form schema using Zod
const studentSchema = z.object({
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

// 1. CREATE - Add a new student
export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body
    const validatedData = studentSchema.parse(req.body);
    
    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    
    // Format full name
    const fullName = [validatedData.firstName, validatedData.middleName, validatedData.lastName]
      .filter(Boolean)
      .join(' ');
    
    // Check if email already exists
    const existingStudent = await prisma.student.findUnique({
      where: { email: validatedData.email }
    });
    
    if (existingStudent) {
      throw new CustomError("Email already registered", 400);
    }
    
    // Check if parent email already exists
    const existingParentEmail = await prisma.studentDetails.findFirst({
      where: { parentEmail: validatedData.parentEmail }
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
export const getStudent = async (req: Request, res: Response, next: NextFunction) => {
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
export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
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
    if (validatedData.parentEmail && 
        existingStudent.studentDetails?.parentEmail !== validatedData.parentEmail) {
      const parentEmailExists = await prisma.studentDetails.findFirst({
        where: { 
          parentEmail: validatedData.parentEmail,
          NOT: { studentId: id }
        },
      });
      
      if (parentEmailExists) {
        throw new CustomError("Parent email already registered", 400);
      }
    }
    
    // Format name if name components are provided
    let fullName = existingStudent.name;
    if (validatedData.firstName || validatedData.lastName) {
      const firstName = validatedData.firstName || existingStudent.name.split(' ')[0];
      const lastName = validatedData.lastName || 
        (existingStudent.name.split(' ').length > 1 ? 
          existingStudent.name.split(' ').slice(1).join(' ') : '');
      const middleName = validatedData.middleName || '';
      
      fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
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
      if (validatedData.gender || validatedData.dateOfBirth || validatedData.section || 
          validatedData.previousSchool || validatedData.academicYear || validatedData.phone || 
          validatedData.alternatePhone || validatedData.address || validatedData.city || 
          validatedData.state || validatedData.zipCode || validatedData.parentName || 
          validatedData.relationship || validatedData.parentPhone || validatedData.parentEmail || 
          validatedData.bloodGroup || validatedData.medicalInformation || 
          validatedData.hobbies || validatedData.extraCurricular || validatedData.additionalNotes) {
        
        await tx.studentDetails.update({
          where: { studentId: id },
          data: {
            gender: validatedData.gender?.toUpperCase() as any,
            dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : undefined,
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
export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
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
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { teacherSchema, teacherUpdateSchema, teacherPasswordSchema } from '../schemas/teacherSchema';
import { CustomError } from '../utils/errorHandler';

const prisma = new PrismaClient();

// Create a teacher
export const createTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body
    const validatedData = teacherSchema.parse(req.body);
    
    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    
    // Check if email already exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { email: validatedData.email }
    });
    
    if (existingTeacher) {
      throw new CustomError("Email already registered", 400);
    }
    
    // Extract teacher details fields
    const { 
      address, city, state, zipCode, dateOfBirth, qualification, 
      experience, specialization, emergencyContact, joinDate, additionalNotes,
      ...teacherData 
    } = validatedData;
    
    // Create teacher and details in a transaction
    const newTeacher = await prisma.$transaction(async (tx) => {
      // Create teacher record
      const teacher = await tx.teacher.create({
        data: {
          name: teacherData.name,
          email: teacherData.email,
          password: hashedPassword,
          subjects: teacherData.subjects,
          phone: teacherData.phone,
          classes: teacherData.classes || 0,
          status: (teacherData.status || 'ACTIVE') as any,
          employmentType: (teacherData.employmentType || 'FULLTIME') as any,
        },
      });
      
      // Create teacher details if any detail fields are provided
      if (
        address || city || state || zipCode || dateOfBirth || qualification ||
        experience || specialization || emergencyContact || joinDate || additionalNotes
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
export const getAllTeachers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        subjects: true,
        phone: true,
        classes: true,
        status: true,
        employmentType: true,
        createdAt: true,
      }
    });
    
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
export const getTeacherById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        teacherDetails: true
      }
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
export const updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = teacherUpdateSchema.parse(req.body);
    
    // Check if teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id },
      include: { teacherDetails: true }
    });
    
    if (!existingTeacher) {
      throw new CustomError("Teacher not found", 404);
    }
    
    // Extract teacher details fields
    const { 
      address, city, state, zipCode, dateOfBirth, qualification, 
      experience, specialization, emergencyContact, joinDate, additionalNotes,
      ...teacherData 
    } = validatedData;
    
    // Update teacher and details in a transaction
    await prisma.$transaction(async (tx) => {
      // Update teacher record if there are teacher fields to update
      if (Object.keys(teacherData).length > 0) {
        await tx.teacher.update({
          where: { id },
          data: teacherData,
        });
      }
      
      // Check if any detail fields are provided
      const hasDetailsToUpdate = [
        address, city, state, zipCode, dateOfBirth, qualification,
        experience, specialization, emergencyContact, joinDate, additionalNotes
      ].some(field => field !== undefined);
      
      if (hasDetailsToUpdate) {
        // Prepare the details data object
        const detailsData: any = {};
        if (address !== undefined) detailsData.address = address;
        if (city !== undefined) detailsData.city = city;
        if (state !== undefined) detailsData.state = state;
        if (zipCode !== undefined) detailsData.zipCode = zipCode;
        if (dateOfBirth !== undefined) detailsData.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
        if (qualification !== undefined) detailsData.qualification = qualification;
        if (experience !== undefined) detailsData.experience = experience;
        if (specialization !== undefined) detailsData.specialization = specialization;
        if (emergencyContact !== undefined) detailsData.emergencyContact = emergencyContact;
        if (joinDate !== undefined) detailsData.joinDate = joinDate ? new Date(joinDate) : null;
        if (additionalNotes !== undefined) detailsData.additionalNotes = additionalNotes;
        
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
      include: { teacherDetails: true }
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
export const deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    // Check if teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id }
    });
    
    if (!existingTeacher) {
      throw new CustomError("Teacher not found", 404);
    }
    
    // Delete teacher (related details will be deleted due to cascade)
    await prisma.teacher.delete({
      where: { id }
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
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = teacherPasswordSchema.parse(req.body);
    
    // Check if teacher exists
    const teacher = await prisma.teacher.findUnique({
      where: { id }
    });
    
    if (!teacher) {
      throw new CustomError("Teacher not found", 404);
    }
    
    // Verify current password
    const isPasswordValid = await bcrypt.compare(validatedData.currentPassword, teacher.password);
    
    if (!isPasswordValid) {
      throw new CustomError("Current password is incorrect", 400);
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10);
    
    // Update password
    await prisma.teacher.update({
      where: { id },
      data: { password: hashedPassword }
    });
    
    res.status(200).json({
      status: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update teacher status
export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['ACTIVE', 'INACTIVE', 'ONLEAVE', 'TERMINATED'].includes(status)) {
      throw new CustomError("Invalid status value", 400);
    }
    
    // Check if teacher exists
    const existingTeacher = await prisma.teacher.findUnique({
      where: { id }
    });
    
    if (!existingTeacher) {
      throw new CustomError("Teacher not found", 404);
    }
    
    // Update status
    await prisma.teacher.update({
      where: { id },
      data: { status: status as any }
    });
    
    res.status(200).json({
      status: true,
      message: "Teacher status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};