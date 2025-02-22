import { Request, Response } from 'express';
import { registerInstitution } from '../services/institutionServices';

export const registerInstitutionHandler = async (req: Request, res: Response) => {
  try {
    const { name, contactPerson, role, email, phone, address, city, state } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) return res.status(400).json({ error: 'At least one image is required' });

    const result = await registerInstitution({
      name,
      contactPerson,
      role,
      email,
      phone,
      address,
      city,
      state,
      images: files,
    });

    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
