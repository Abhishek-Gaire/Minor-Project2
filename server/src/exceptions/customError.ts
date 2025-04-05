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
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

// Custom error class
export class CustomError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

// Error handler middleware
export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: false,
      message: 'Validation error',
      errors: err.errors
    });
  }
  
  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        status: false,
        message: 'A unique constraint violation occurred',
        field: err.meta?.target || 'unknown field'
      });
    }
    
    return res.status(400).json({
      status: false,
      message: 'Database error',
      code: err.code
    });
  }
  
  // Handle custom errors
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: false,
      message: err.message
    });
  }
  
  // Default error handling
  return res.status(500).json({
    status: false,
    message: 'An unexpected error occurred'
  });
};