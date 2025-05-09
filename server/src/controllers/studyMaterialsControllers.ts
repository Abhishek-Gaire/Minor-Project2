import { NextFunction, Request, RequestHandler, Response } from "express";
import multer from "multer";
import { CustomError } from "../exceptions/customError";
import { materialSchema } from "../types/schema";
import prisma from "../config/dbConfig";

import uploadToSupabase from "../utils/supabaseFileUpload";
import deleteFromSupabase from "../utils/supabaseFileDelete";

// Configure multer for temporary file storage in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30MB limit
  },
});

export const createMaterials: RequestHandler[] = [
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      if (!user) {
        throw new CustomError("Not Authorized", 401);
      }
      const teacherExists = await prisma.teacher.findUnique({
        where: {
          id: user.id,
        },
      });
      if (!teacherExists) {
        throw new CustomError("Teacher Not Found", 404);
      }
console.log(req.body);
      const validatedBody = materialSchema.parse(req.body);

      const { title, subject, type, uploadedBy} = validatedBody;
      const file = req.file;

      if (!file) {
        throw new CustomError("File for materials required", 400);
      }

      const { publicUrl, error } = await uploadToSupabase(
        file,
        "studyMaterials"
      );

      if (error) {
        throw new CustomError("Upload Failed", 400);
      }
      // Create material record in the database
      const material = await prisma.material.create({
        data: {
          title,
          subject,
          type,
          fileUrl: publicUrl!,
          fileName: file.originalname,
          fileType: file.mimetype,
          fileSize: file.size,
          teacherId: teacherExists.id,
          uploadedBy,
          uploadedDate: new Date(),
        },
      });

      res.status(201).json({
        message: "Material created successfully",
        data: material,
      });
    } catch (error) {
      next(error);
    }
  },
];

export const getMaterials: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user) {
      throw new CustomError("Not Authorized", 401);
    }

    // Optional query parameters for filtering
    const { subject, type } = req.query;

    // Build where clause for filtering
    const whereClause: any = {};

    if (subject) {
      whereClause.subject = subject as string;
    }

    if (type) {
      whereClause.type = type as string;
    }

    // Fetch materials from database
    const materials = await prisma.material.findMany({
      where: whereClause,
      orderBy: {
        uploadedDate: "desc",
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Materials fetched successfully",
      data: materials,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteMaterial: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    if (!user) {
      throw new CustomError("Not Authorized", 401);
    }

    // Find the material first
    const material = await prisma.material.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!material) {
      throw new CustomError("Material not found", 404);
    }

    // Check if the user is the owner of the material or an admin
    if (material.teacherId !== user.id) {
      throw new CustomError("Not authorized to delete this material", 403);
    }

     // Delete file from Supabase Storage
    const { success, error } = await deleteFromSupabase(material.fileUrl);
    if (error) {
      throw new CustomError("Deletion From Storage Failed", 400);
    }

    if (success) {
      // Delete the material from database
      await prisma.material.delete({
        where: {
          id: Number(id),
        },
      });
    }

    res.status(200).json({
      status: true,
      message: "Material deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
