import { ClassChatMessages } from "@prisma/client";
import prisma from "../config/dbConfig";
import { CustomError } from "../exceptions/customError";

const getMessagesByClassName = async (
  className: string,
  limit = 50
): Promise<ClassChatMessages[]> => {
  return await prisma.classChatMessages.findMany({
    where: {
      class: className,
    },
    orderBy: {
      timestamp: "asc",
    },
    take: limit,
  });
};

const addClassMessage = async (
  sender: string,
  content: string,
  grade: string
): Promise<ClassChatMessages> => {
  const newMessage = await prisma.classChatMessages.create({
    data: { sender, content, class: grade },
  });
  if (!newMessage) {
    throw new CustomError("Can Not Add Messages", 400);
  }

  return newMessage;
};

export { getMessagesByClassName, addClassMessage };
