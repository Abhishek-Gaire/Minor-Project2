import { ClassChatMessages } from "@prisma/client";
import prisma from "../config/dbConfig";
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

export { getMessagesByClassName };
