import { Messages, Prisma, PrismaClient, Student } from "@prisma/client";
import prisma from "../config/dbConfig";

// type PrismaTransactionClient = Parameters<typeof prisma.$transaction>[0];

type PrismaClientOrTransaction = PrismaClient | Prisma.TransactionClient;
// Get Conversation Id
const getConversationId = async (
  sender: string,
  receiver: string
): Promise<string> => {
  // Find or create conversation
  let conversationId: string;
  const conversation = await prisma.conversations.findFirst({
    where: {
      AND: [
        { participants: { has: sender } },
        { participants: { has: receiver } },
      ],
    },
  });

  // If conversation doesn't exist, create it
  if (!conversation) {
    const newConversation = await prisma.conversations.create({
      data: {
        participants: [sender, receiver],
      },
    });
    conversationId = newConversation.id;
  } else {
    conversationId = conversation.id;
  }
  return conversationId;
};

// Save Private Messages
const savePrivateMessage = async (
  conversationId: string,
  content: string,
  sender: string,
  receiver: string,
  delivered: boolean,
): Promise<Messages> => {
  const savedMessage = await prisma.messages.create({
    data: {
      sender: sender,
      receiver: receiver,
      conversationId: conversationId,
      content: content,
      delivered,
    },
  });
  return savedMessage;
};

// Get 50 private messages between two participants
const getPrivateMessages = async (
  conversationId: string,
  tx: PrismaClientOrTransaction = prisma,
  limit: number = 50
): Promise<Messages[]> => {
  const messages = await tx.messages.findMany({
    where: {
      conversationId: conversationId,
    },
    orderBy: {
      timeStamp: "asc",
    },
    take: limit,
  });

  return messages;
};

// Mark messages as read (make deliver true)
const markMessagesAsRead = async (
  conversationId: string,
  tx: PrismaClientOrTransaction = prisma
): Promise<void> => {
  await tx.messages.updateMany({
    where: {
      conversationId: conversationId,
      delivered: false,
    },
    data: {
      delivered: true,
    },
  });
};

// Get Unread Messages Count(deliver false)
const getUnreadMessagesCount = async (
  conversationId: string
): Promise<number> => {
  return await prisma.messages.count({
    where: {
      conversationId, 
      delivered: false,
    },
  });
};

const getAllPrivateMessages = async (
  id: string
): Promise<{ filteredMessages: Messages[]; students: Student[] }> => {
  let userObject, students;
  userObject = await prisma.student.findUnique({
    where: { id: id },
  });

  if (userObject) {
    // If the user is a student, get all students in the same grade
    students = await prisma.student.findMany({
      where: {
        grade: userObject.grade,
      },
    });
  } else {
    // Else, assume it's a teacher
    userObject = await prisma.teacher.findUnique({
      where: { id: id },
    });

    students = await prisma.student.findMany({
      take: 20, // Limit to 20 students
    });
  }
  const allMessages = await prisma.messages.findMany({
    where: {
      OR: [
        { sender: userObject?.name }, // Sent Messages
        { receiver: userObject?.name }, // Receive Messages
      ],
    },
    orderBy: {
      timeStamp: "desc",
    },
  });
  // Group messages by sender-receiver pair and keep only the latest message
  const recentMessages: Messages[] = Object.values(
    allMessages.reduce<Record<string, Messages>>((acc, message) => {
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
  // Remove duplicates where sender-receiver pair is already reversed in the list
  const filteredMessages: Messages[] = [];
  const seenPairs = new Set<string>();

  for (const message of recentMessages) {
    const key = `${message.sender}-${message.receiver}`;
    const reverseKey = `${message.receiver}-${message.sender}`;

    if (!seenPairs.has(reverseKey)) {
      filteredMessages.push(message);
      seenPairs.add(key);
    }
  }
  return { filteredMessages, students };
};

export {
  getConversationId,
  savePrivateMessage,
  getPrivateMessages,
  markMessagesAsRead,
  getUnreadMessagesCount,
  getAllPrivateMessages,
};
