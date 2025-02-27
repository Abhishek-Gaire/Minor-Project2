import { RequestHandler,Request, Response } from 'express';
import { registerInstitution } from '../services/institutionServices';

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
  
