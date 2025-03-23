import { RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const SUPABASE_URL = process.env.SUPABASE_URL as string;

const prisma = new PrismaClient();

export const registerInstitutionHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name, contactPerson, role, email, phone, address, city, imageUrl } =
    req.body;

  const fileURL = `${SUPABASE_URL}/storage/v1/object/public/${imageUrl}`;

<<<<<<< HEAD
export const registerInstitutionHandler: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { name, contactPerson, role, email, phone, address, city, state, imageUrl } = req.body;
  
      // Validate required fields
      if (!name || !contactPerson || !role || !email || !phone || !address || !city || !state) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      const result = await registerInstitution({
        name,
        contactPerson,
        role,
        email,
        phone,
        address,
        city,
        state,
        images: imageUrl, // Make sure 'imageUrl' is properly handled in your function
      });
  
      return res.status(201).json({ success: true, message: "Institution registered successfully", data: result });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message || "Server Error" });
    }
  };
  
=======
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
>>>>>>> f8269f4e6878fed89e1ce2754d738d7c48f61547
