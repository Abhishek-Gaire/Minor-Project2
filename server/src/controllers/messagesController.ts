import { Request, RequestHandler, Response } from "express";

import prisma from "../config/dbConfig";
import { CustomError } from "../exceptions/customError";

export const getPrivateMessages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { sender, receiver } = req.query;
    if (!sender || !receiver) {
      throw new CustomError("Messengers are required", 400);
    }

    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          { sender, receiver }, // sent messages
          { sender: receiver, receiver: sender },
        ],
      },
      orderBy: { timeStamp: "asc" },
    });
    if (!messages) {
      throw new CustomError("Message Not Found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Messages Fetched",
      data: messages,
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

export const addPrivateMessage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { sender, receiver, content } = req.body;
    if (!sender || !receiver || !content) {
      throw new CustomError("All fields are required", 400);
    }

    const newMessage = await prisma.messages.create({
      data: { sender, receiver, content, delivered: false },
    });
    if (!newMessage) {
      throw new CustomError("Can Not Add Messages", 400);
    }

    res.status(201).json({
      success: true,
      message: "Message Added Successfully",
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

export const addPrivateMessagesDeliver: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { receiver, sender } = req.body;
    if (!sender || !receiver) {
      throw new CustomError("Messengers are required", 400);
    }

    const updatedMessages = await prisma.messages.updateMany({
      where: {
        receiver,
        sender,
        delivered: false, // Only update undelivered messages
      },
      data: { delivered: true },
    });
    if (!updatedMessages) {
      throw new CustomError("Cant changes the deleivered status", 400);
    }
    res.status(201).json({
      success: true,
      message: "Deliver changed from false to true",
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

export const getAllPrivateMessages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { user } = req.params;
    if (!user) {
      throw new CustomError("User Required", 400);
    }

    const allMessages = await prisma.messages.findMany({
      where: {
        sender: user,
      },
      orderBy: {
        timeStamp: "desc",
      },
    });
    if (!allMessages) {
      throw new CustomError("No Messages Found for the current user", 404);
    }

    // Group messages by receiver and select the most recent one for each receiver
    const recentMessagesByReceiver = allMessages.reduce((acc, message) => {
      if (!acc.has(message.receiver)) {
        acc.set(message.receiver, message);
      }
      return acc;
    }, new Map<string, (typeof allMessages)[0]>()); // Use Map for better type inference);

    // Convert the object back to an array
    const recentMessages = Object.values(recentMessagesByReceiver);
    if (!recentMessages) {
      throw new CustomError("Recent Messages Not Found", 404);
    }

    res.status(200).json({
      success: true,
      messages: "Recent Messages Found",
      data: recentMessages,
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
