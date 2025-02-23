mport { Request, Response, NextFunction } from 'express';

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const isAdmin = true; // Placeholder for real auth logic
  if (!isAdmin) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};
