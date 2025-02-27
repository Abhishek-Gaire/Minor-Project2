import { RequestHandler,Request, Response } from 'express';
import { registerInstitution } from '../services/institutionServices';

export const registerInstitutionHandler:RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, contactPerson, role, email, phone, address, city, state,imageUrl } = req.body;

    const result = await registerInstitution({
      name,
      contactPerson,
      role,
      email,
      phone,
      address,
      city,
      state,
      images:imageUrl,
    });

    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
