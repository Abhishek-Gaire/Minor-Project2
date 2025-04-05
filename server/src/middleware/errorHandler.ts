import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

import { CustomError } from "../exceptions/customError";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error:", err);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      status: false,
      message: "Validation error",
      errors: err.errors,
    });
    return;
  }

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(409).json({
        status: false,
        message: "A unique constraint violation occurred",
        field: err.meta?.target || "unknown field",
      });
      return;
    }

    res.status(400).json({
      status: false,
      message: "Database error",
      code: err.code,
    });
    return;
  }

  // Handle custom errors
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      status: false,
      message: err.message,
    });
    return;
  }

  // Default error handling
  res.status(500).json({
    status: false,
    message: "An unexpected error occurred",
  });
  return;
};
