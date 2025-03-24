import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const uploadAssignment = async (req: Request, res: Response) => {
  try {
    const { role, title, fileUrl } = req.body;
    const { id } = req.params; // Extracting ID from request params

    // Verify if user exists in respective table
    const user = await (role === "Student"
      ? prisma.student.findUnique({ where: { id } })
      : prisma.teacher.findUnique({ where: { id } }));

    if (!user) {
      return res.status(404).json({ success: false, message: `${role} not found` });
    }

    // Store assignment in the database
    const assignment = await prisma.assignment.create({
      data: {
        title,
        fileUrl,
        uploadedById: id,
        role,
        uploadedAt: new Date(),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Assignment uploaded successfully",
      data: assignment,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Server Error" });
  }
};
