import { Request, RequestHandler, Response } from "express";

import prisma from "../config/dbConfig";
import { CustomError } from "../exceptions/customError";

export const getPrivateMessages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const sender = Array.isArray(req.query.sender)
      ? req.query.sender[0]
      : req.query.sender;
    const receiver = Array.isArray(req.query.receiver)
      ? req.query.receiver[0]
      : req.query.receiver;
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
      message: "Private Messages Fetched",
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
        receiver: receiver.name,
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
type Message = {
  id: number;
  sender: string;
  receiver: string;
  content: string;
  timeStamp: Date;
  delivered: boolean;
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
        OR: [
          { sender: user }, // sent messages
          { receiver: user }, // received messages
        ],
      },
      orderBy: {
        timeStamp: "desc",
      },
    });
    if (!allMessages) {
      throw new CustomError("No Messages Found for the current user", 404);
    }

    // Group messages by sender-receiver pair and keep only the latest message
    const recentMessages: Message[] = Object.values(
      allMessages.reduce<Record<string, Message>>((acc, message) => {
        const key = `${message.sender}-${message.receiver}`;
        if (
          !acc[key] ||
          new Date(message.timeStamp).getTime() >
            new Date(acc[key].timeStamp).getTime()
        ) {
          acc[key] = message; // Store the latest message for this pair
        }
        return acc;
      }, {})
    );
    if (!recentMessages) {
      throw new CustomError("Recent Messages Not Found", 404);
    }

    // Remove duplicates where sender-receiver pair is already reversed in the list
    const filteredMessages: Message[] = [];
    const seenPairs = new Set<string>();

    for (const message of recentMessages) {
      const key = `${message.sender}-${message.receiver}`;
      const reverseKey = `${message.receiver}-${message.sender}`;

      if (!seenPairs.has(reverseKey)) {
        filteredMessages.push(message);
        seenPairs.add(key);
      }
    }

    const students = await prisma.student.findMany();

    res.status(200).json({
      success: true,
      messages: "All Recent Messages Found",
      data: { filteredMessages, students },
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
