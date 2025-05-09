import { Request, Response, NextFunction, RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomError } from "../exceptions/customError";

const prisma = new PrismaClient();

/**
 * Get all class sessions for a user
 */
export const getClasses: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    const role = (req as any).role;

    if (!user) {
      throw new CustomError("Not Authorized", 401);
    }
    const userId = req.params.userId;

    // Verify the requesting user is authorized to see these classes
    if (user.id !== userId) {
      throw new CustomError("Not authorized to access these classes", 403);
    }
    let userC;
    let classNumber,teacherName;
    // For students: fetch classes they're enrolled in
    // For teachers: fetch classes they teach
    if (role === "student") {
      userC= await prisma.student.findUnique({
        where: {
          id: userId,
        },
      });
      classNumber = userC!.grade.split("")[1];
    } else if (role === "teacher") {
      userC= await prisma.teacher.findUnique({
        where: {
          id: userId,
        },
      });
      teacherName = userC!.name;
    }

    const whereClause = {
      classNumber: role === "student" ? Number(classNumber) : undefined,
      teacherName: role === "teacher" ? teacherName : undefined,
    };
    const classes = await prisma.classSession.findMany({
      where: {
        ...whereClause
      },
      orderBy: {
        startTime: "asc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Classes fetched successfully",
      data: classes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single class by ID
 */
export const getClassById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user) {
      throw new CustomError("Not Authorized", 401);
    }

    const classId = req.params.classId;

    const classSession = await prisma.classSession.findUnique({
      where: {
        id: classId,
      },
    });

    if (!classSession) {
      throw new CustomError("Class not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Class fetched successfully",
      data: classSession,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new class session
 */
export const createClass: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user) {
      throw new CustomError("Not Authorized", 401);
    }

    const {
      subject,
      description,
      teacherName,
      classNumber,
      startTime,
      endTime,
      status,
    } = req.body;

    if (endTime <= startTime) {
      throw new CustomError("End time must be after start time", 400);
    }

    // Create the class
    const newClass = await prisma.classSession.create({
      data: {
        subject,
        description,
        teacherName,
        classNumber,
        startTime,
        endTime,
        status: status || "upcoming",
      },
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing class session
 */
export const updateClass: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user) {
      throw new CustomError("Not Authorized", 401);
    }

    const classId = req.params.classId;

    // Find the class first
    const existingClass = await prisma.classSession.findUnique({
      where: {
        id: classId,
      },
    });

    if (!existingClass) {
      throw new CustomError("Class not found", 404);
    }

    const {
      subject,
      description,
      teacherName,
      classNumber,
      startTime,
      endTime,
      status,
    } = req.body;

    // Prepare update data
    const updateData: any = {};

    if (subject) updateData.subject = subject;
    if (description) updateData.description = description;
    if (teacherName) updateData.teacherName = teacherName;
    if (classNumber) updateData.classNumber = classNumber;
    if (status) updateData.status = status;

    // Handle time updates and validation
    if (startTime || endTime) {
      const start = startTime ? new Date(startTime) : existingClass.startTime;
      const end = endTime ? new Date(endTime) : existingClass.endTime;

      if (end <= start) {
        throw new CustomError("End time must be after start time", 400);
      }

      if (startTime) updateData.startTime = start;
      if (endTime) updateData.endTime = end;
    }

    // Update the class
    const updatedClass = await prisma.classSession.update({
      where: {
        id: classId,
      },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a class session
 */
export const deleteClass: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user) {
      throw new CustomError("Not Authorized", 401);
    }

    const classId = req.params.classId;

    // Find the class first
    const existingClass = await prisma.classSession.findUnique({
      where: {
        id: classId,
      },
    });

    if (!existingClass) {
      throw new CustomError("Class not found", 404);
    }

    // Delete the class
    await prisma.classSession.delete({
      where: {
        id: classId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
