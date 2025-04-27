import { NextFunction, Request, RequestHandler, Response } from "express";
import { CustomError } from "../exceptions/customError";
import multer from "multer";

import { v4 as uuidv4 } from "uuid";
import path from "path";

import supabase from "../config/supabase";
import prisma from "../config/dbConfig";

// Configure multer for temporary file storage in memory
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

export const createAssignMent: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      teacherId,
      status,
      subject,
      grade,
      title,
      description,
      dueDate,
      pointsPossible,
    } = req.body;

    // Verify if teacher exists
    const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } });
    if (!teacher) {
      throw new CustomError("Teacher not found", 404);
    }

    // Store assignment in the database
    const assignment = await prisma.assignment.create({
      data: {
        title,
        subject,
        grade,
        description,
        dueDate:new Date(dueDate),
        pointsPossible,
        status,        
        teacherId,
      },
    });

    if(!assignment){
      throw new CustomError("Assignment not created", 500);
    }
    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      data: assignment,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAssignments: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, searchTerm } = req.query;
    
    // Build filter conditions
    const filters: any = {};
    
    if (status) {
      filters.status = status;
    }
    
    if (searchTerm) {
      filters.OR = [
        { title: { contains: searchTerm as string, mode: 'insensitive' } },
        { subject: { contains: searchTerm as string, mode: 'insensitive' } },
        { description: { contains: searchTerm as string, mode: 'insensitive' } }
      ];
    }
    // Fetch assignments with filters
    const assignments = await prisma.assignment.findMany({
      where: filters,
      include: {
        submissions: {
          select: {
            studentId: true,
            studentName: true,
            submissionDate: true,
            grade: true,
            submissionUrl: true
          }
        },
        teacher: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    // Format assignments to match expected API response
    const formattedAssignments = assignments.map(assignment => {
      return {
        ...assignment,
        totalStudents: assignment.submissions.length,
        submissions: assignment.submissions.map(sub => ({
          studentId: sub.studentId,
          studentName: sub.studentName,
          submissionDate: sub.submissionDate,
          grade: sub.grade,
          submissionUrl: sub.submissionUrl
        }))
      };
    });
    
    res.status(200).json({
      success: true,
      message: "Assignments fetched successfully",
      data: formattedAssignments
    });
    return;
  } catch (error) {
    next(error);
  }
};


export const getAssignmentById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    
    // Fetch assignment by ID
    const assignment = await prisma.assignment.findUnique({
      where: { id: Number(id) },
      include: {
        submissions: {
          select: {
            studentId: true,
            studentName: true,
            submissionDate: true,
            grade: true,
            submissionUrl: true
          }
        },
        teacher: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    if (!assignment) {
      throw new CustomError("Assignment not found", 404);
    }
    
    // Format assignment to match expected API response
    const formattedAssignment = {
      ...assignment,
      totalStudents: assignment.submissions.length,
      submissions: assignment.submissions.map(sub => ({
        studentId: sub.studentId,
        studentName: sub.studentName,
        submissionDate: sub.submissionDate,
        grade: sub.grade,
        submissionUrl: sub.submissionUrl
      }))
    };
    
    res.status(200).json({
      success: true,
      message: "Assignment fetched successfully",
      data: formattedAssignment
    });
    return;
  } catch (error) {
    next(error);
  }
};


export const updateAssignment: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      title,
      subject,
      grade,
      description,
      dueDate,
      pointsPossible,
      status
    } = req.body;
    
    // Check if assignment exists
    const existingAssignment = await prisma.assignment.findUnique({
      where: { id: Number(id) }
    });
    
    if (!existingAssignment) {
      throw new CustomError("Assignment not found", 404);
    }
    
    // Update assignment
    const updatedAssignment = await prisma.assignment.update({
      where: { id: Number(id) },
      data: {
        title,
        subject,
        grade,
        description,
        dueDate,
        pointsPossible,
        status
      }
    });
    
    res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
      data: updatedAssignment
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAssignment: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    
    // Check if assignment exists
    const existingAssignment = await prisma.assignment.findUnique({
      where: { id: Number(id) },
      include: {
        submissions: true
      }
    });
    
    if (!existingAssignment) {
      throw new CustomError("Assignment not found", 404);
    }
    
    // Delete files from Supabase storage if submissions exist
    for (const submission of existingAssignment.submissions) {
      if (submission.submissionUrl) {
        // Extract the file path from the URL
        const filePath = submission.submissionUrl.split('/').pop();
        if (filePath) {
          // Remove file from Supabase storage
          const { error } = await supabase.storage
            .from('assignments')
            .remove([`submissions/${filePath}`]);
            
          if (error) {
            console.error("Error deleting file from storage:", error);
          }
        }
      }
    }
    
    // Delete all submissions related to this assignment
    await prisma.submission.deleteMany({
      where: { assignmentId: Number(id) }
    });
    
    // Then delete the assignment
    await prisma.assignment.delete({
      where: { id: Number(id) }
    });
    
    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully"
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const submitAssignment: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Use multer to handle file uploads
  const uploadMiddleware = upload.single('file');
  
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return next(new CustomError("File upload error: " + err.message, 400));
    }
    
    try {
      const { assignmentId, studentId } = req.body;
      const file = req.file;
      
      if (!file) {
        throw new CustomError("No file uploaded", 400);
      }
      
      // Check if assignment exists
      const assignment = await prisma.assignment.findUnique({
        where: { id: Number(assignmentId) }
      });
      
      if (!assignment) {
        throw new CustomError("Assignment not found", 404);
      }
      
      // Check if student exists
      const student = await prisma.student.findUnique({
        where: { id: studentId }
      });
      
      if (!student) {
        throw new CustomError("Student not found", 404);
      }
      
      // Check if student has already submitted this assignment
      const existingSubmission = await prisma.submission.findFirst({
        where: {
          assignmentId: Number(assignmentId),
          studentId: studentId
        }
      });
      
      if (existingSubmission) {
        throw new CustomError("You have already submitted this assignment", 400);
      }
      
      // Generate a unique filename
      const fileExtension = path.extname(file.originalname);
      const fileName = `${uuidv4()}${fileExtension}`;
      const filePath = `assignments/${fileName}`;
      
      // Upload file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('minor2storage')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600'
        });
        
      if (uploadError) {
        throw new CustomError("Failed to upload file: " + uploadError.message, 500);
      }
      
      // Get the public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('minor2storage')
        .getPublicUrl(filePath);
        
      const publicUrl = publicUrlData.publicUrl;
      
      // Create submission with public URL
      const submission = await prisma.submission.create({
        data: {
          assignmentId: Number(assignmentId),
          studentId: studentId,
          studentName: student.name,
          submissionDate: new Date().toISOString(),
          submissionUrl: publicUrl
        }
      });
      
      res.status(201).json({
        success: true,
        message: "Assignment submitted successfully",
        data: submission
      });
      return;
    } catch (error) {
      next(error);
    }
  });
  return;
};

export const getSubmissions: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assignmentId } = req.params;
    
    // Check if assignment exists
    const assignment = await prisma.assignment.findUnique({
      where: { id: Number(assignmentId) }
    });
    
    if (!assignment) {
      throw new CustomError("Assignment not found", 404);
    }
    
    // Fetch all submissions for this assignment
    const submissions = await prisma.submission.findMany({
      where: { assignmentId: Number(assignmentId) },
    });
    
    // Format submissions to match expected API response
    const formattedSubmissions = submissions.map(sub => ({
      studentId: sub.studentId,
      studentName: sub.studentName,
      submissionDate: sub.submissionDate,
      grade: sub.grade,
      submissionUrl: sub.submissionUrl
    }));
    
    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      data: formattedSubmissions
    });
  } catch (error) {
    next(error);
  }
};

export const gradeSubmission: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { assignmentId } = req.params;
    const { studentId, grade, feedback, gradedAt } = req.body;
    
    // Check if assignment exists
    const assignment = await prisma.assignment.findUnique({
      where: { id: Number(assignmentId) }
    });
    
    if (!assignment) {
      throw new CustomError("Assignment not found", 404);
    }
    
    // Check if submission exists
    const submission = await prisma.submission.findFirst({
      where: {
        assignmentId: Number(assignmentId),
        studentId: studentId
      }
    });
    
    if (!submission) {
      throw new CustomError("Submission not found", 404);
    }
    
    // Validate grade
    if (grade < 0 || grade > assignment.pointsPossible) {
      throw new CustomError(`Grade must be between 0 and ${assignment.pointsPossible}`, 400);
    }
    
    // Update submission with grade and feedback
    const updatedSubmission = await prisma.submission.update({
      where: { id: submission.id },
      data: {
        grade,
        // gradedAt: gradedAt || new Date().toISOString()
      }
    });
    
    res.status(200).json({
      success: true,
      message: "Submission graded successfully",
      data: updatedSubmission
    });
    return;
  } catch (error) {
    next(error);
  }
};