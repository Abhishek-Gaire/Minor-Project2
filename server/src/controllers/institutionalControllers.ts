import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomError } from "../exceptions/customError";

const SUPABASE_URL = process.env.SUPABASE_URL as string;

const prisma = new PrismaClient();

export const registerInstitutionHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name, contactPerson, role, email, phone, address, city, imageUrl } =
    req.body;

  const fileURL = `${SUPABASE_URL}/storage/v1/object/public/${imageUrl}`;

  try {
    const school = await prisma.school.create({
      data: {
        schoolName: name,
        schoolAddress: address,
        city,
        role,
        contact: contactPerson,
        email,
        phone,
        imageUrl: fileURL, // Store the full image URL
      },
    });
    if (!school) {
      res.status(400).json({
        success: false,
        message: "Failed to add school",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "School Added Successfully",
      data: school,
    });
    return;
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create school." });
    return;
  }
};

export const getAllInstitutionHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const schools = await prisma.school.findMany({
      select: {
        id: true,
        schoolName: true,
        schoolAddress: true,
        imageUrl: true,
      },
    });
    if (!schools) {
      res.status(404).json({
        success: false,
        message: "No schools found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Schools fetched successfully",
      data: schools,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getInstitutionByIdHandler: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const school = await prisma.school.findUnique({
      where: {
        id: id,
      },
    });
    if (!school) {
      throw new CustomError("School not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "School fetched successfully",
      data: school,
    });
  } catch (error: any) {
    next(error);
  }
};