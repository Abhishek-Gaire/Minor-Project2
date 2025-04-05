export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
// src/utils/customError.ts
export class CustomError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error, 
  req: Request, 
  res: Response, 
  _next: NextFunction
) => {
  console.error(error);
  
  const statusCode = error instanceof CustomError ? error.statusCode : 500;
  const errMessage = error instanceof CustomError ? error.message : "Internal server error";
  
  res.status(statusCode).json({
    status: false,
    message: errMessage,
  });
};