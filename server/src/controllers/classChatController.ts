import { Request, RequestHandler, Response } from "express";

import prisma from "../config/dbConfig";
import { CustomError } from "../exceptions/customError";

export const getAllClassChats: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const className = req.params.className;
    if (!className) {
      res.status(200).json({
        success: true,
        message: "No Chats Found",
        data: [],
      });
      return;
    }

    const messages = await prisma.classChatMessages.findMany({
      where: {
        class: className,
      },
      orderBy: {
        timestamp: "asc",
      },
    });
    if (!messages) {
      throw new CustomError("No Messages Found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Class Chats Fetched",
      data: messages || [],
    });
    return;
  } catch (error) {
    const statusCode = error instanceof CustomError ? error.statusCode : 500;
    const errMessage =
      error instanceof CustomError ? error.message : "Internal server error";
    res.status(statusCode).json({
      status: false,
      message: errMessage,
    });
    return;
  }
};

export const addClassMessage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { sender, content, grade } = req.body;
    if (!sender || !content || !grade) {
      throw new CustomError("Sender Contentand Grade are Required", 404);
    }

    const newMessage = await prisma.classChatMessages.create({
      data: { sender, content, class: grade },
    });
    if (!newMessage) {
      throw new CustomError("Can Not Add Messages", 400);
    }

    res.status(201).json({
      success: true,
      message: "Chat Added Successfully",
      data: newMessage,
    });
    return;
  } catch (error) {
    const statusCode = error instanceof CustomError ? error.statusCode : 500;
    const errMessage =
      error instanceof CustomError ? error.message : "Internal server error";
    res.status(statusCode).json({
      status: false,
      message: errMessage,
    });
    return;
  }
};
