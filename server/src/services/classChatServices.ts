import { ClassChatMessages } from "@prisma/client";
import prisma from "../config/dbConfig";
import { CustomError } from "../exceptions/customError";

const getMessagesByClassName = async (
  className: string | string[],
  limit = 50
): Promise<ClassChatMessages[]> => {
  const gradeString = Array.isArray(className) ? className.join(", ") : className;

  return await prisma.classChatMessages.findMany({
    where: {
      class: gradeString,
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
  grade: string | string[]
): Promise<ClassChatMessages> => {
  const gradeString = Array.isArray(grade) ? grade.join(", ") : grade;

  const newMessage = await prisma.classChatMessages.create({
    data: { sender, content, class: gradeString },
  });

  if (!newMessage) {
    throw new CustomError("Can Not Add Messages", 400);
  }

  return newMessage;
};


export { getMessagesByClassName, addClassMessage };
