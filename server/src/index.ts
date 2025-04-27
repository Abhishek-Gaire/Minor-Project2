import express from "express";
import morgan from "morgan";
import { Server, Socket } from "socket.io";
import http from "http";

import { errorHandler } from "./middleware/errorHandler";

import authRoutes from "./routes/authRoutes";
import schoolRoutes from "./routes/institutionalRoutes";
import adminRouter from "./routes/adminRoutes";
import assignmentRoutes from "./routes/assignmentRoutes";

import corsConfig, { socketCorsOptions } from "./config/corsConfig";
import getLocalIP from "./exceptions/getLocalIP";

import cookieParser from "cookie-parser";
import {
  getCurrentUser,
  isUserInConversation,
  userJoin,
  userLeave,
  userJoinClassChat,
} from "./utils/users";

import * as classChatService from "./services/classChatServices";
import * as privateMessageService from "./services/privateMessageServices";

import prisma from "./config/dbConfig";

// Store sockets by username for private messaging
const userSockets = new Map<string, Socket>();
const classChatSockets = new Map<string, Socket>();

const app = express();
const server = http.createServer(app);
app.use(corsConfig);

const io = new Server(server, {
  cors: socketCorsOptions,
});

// Add Morgan middleware before routes
app.use(morgan("dev")); // Logs in format: :method :url :status :response-time ms

app.use(express.json()); // To parse JSON bodies
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/schools", schoolRoutes);
app.use("/api/v1/assignments", assignmentRoutes);
app.use("/api/v1/admin", adminRouter);

app.use(errorHandler);

// Run when the client connects using socket.io client
io.on("connection", (socket: Socket) => {
  console.log("New Connection", socket.id);

  // Join Room
  socket.on("joinRoom", async ({ userName, conversationId }) => {
    const user = userJoin(socket.id, userName, conversationId);

    if (!user) {
      return;
    }

    // Store socket by username
    userSockets.set(userName, socket);

    socket.join(conversationId);
  });

  socket.on("joinClassRoom", async ({ userName, conversationId }) => {
    const user = userJoinClassChat(socket.id, userName, conversationId);

    if (!user) {
      return;
    }

    // Store socket by username
    classChatSockets.set(userName, socket);

    socket.join(conversationId);
  });

  // Listen for class chat message
  socket.on("receiveClassMessage", async ({ msg, className }) => {
    const user = getCurrentUser(socket.id);

    if (!user) {
      return;
    }
    try {
      // Save message to database
      const newMessage = await classChatService.addClassMessage(
        user.username,
        msg,
        className
      );

      // Broadcast message to room
      io.to(className).emit("sendClassMessage", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("error", { message: "Failed to send class message" });
    }
  });

  // Get class chat History
  socket.on("getClassHistory", async ({ className }) => {
    if (!className) {
      socket.emit("error", { message: "Missing class name" });
      return;
    }
    try {
      const messages = await classChatService.getMessagesByClassName(className);
      socket.emit("classHistory", messages);
    } catch (error) {
      console.error("Error retrieving class history:", error);
      socket.emit("error", { message: "Failed to retrieve class history" });
    }
  });
  
  // Listen for Private Message
  socket.on(
    "sendPrivateMessage",
    async ({ from, to, msg, conversationId, delivered = false }) => {
      if (!from || !to || !conversationId) {
        socket.emit("error", { message: "Missing required fields" });
        return;
      }
      try {
        // Save private message to database
        const savedMessage = await privateMessageService.savePrivateMessage(
          conversationId,
          msg,
          from,
          to,
          delivered
        );

        // Format message to match Message type
        const formattedMessage: {
          id: number;
          sender: string;
          receiver: string;
          content: string;
          timestamp?: Date;
          delivered?: boolean;
          isSelf?: boolean;
        } = {
          id: savedMessage.id,
          sender: savedMessage.sender,
          receiver: savedMessage.receiver,
          content: savedMessage.content,
          timestamp: savedMessage.timeStamp,
          delivered: savedMessage.delivered,
          isSelf: false,
        };

        // Emit to receiver
        const receiverSocket = userSockets.get(to);
        if (receiverSocket) {
          receiverSocket.emit("receivePrivateMessage", {
            ...formattedMessage,
            isSelf: false,
          });
        } else {
          console.log(`Receiver ${to} not connected`);
        }

        // Emit to sender
        socket.emit("receivePrivateMessage", {
          ...formattedMessage,
          isSelf: true,
        });
      } catch (error) {
        console.error("Error sending private message:", error);
        socket.emit("error", { message: "Failed to send private message" });
      }
    }
  );

  // Check if a user is online
  socket.on("checkOnlineStatus", ({ username, conversationId }) => {
    if (!username || !conversationId) {
      socket.emit("error", { message: "Missing Username and conversationid" });
    }
    try {
      const isOnline = isUserInConversation(username, conversationId);
      socket.emit("onlineStatus", { username, isOnline });
    } catch (error) {
      console.error("Error retrieving private message history:", error);
      socket.emit("error", {
        message: `Failed to check the online status of ${username}`,
      });
    }
  });

  // Get private message history between two users
  socket.on("getPrivateHistory", async ({ currentUser, otherUser }) => {
    if (!currentUser || !otherUser) {
      socket.emit("error", { message: "Missing user information" });
      return;
    }
    try {
      // Mark messages as read
      const conversationId = await privateMessageService.getConversationId(
        currentUser,
        otherUser
      );
      // Run in a transaction
      const [messages] = await prisma.$transaction(async (tx) => {
        // Mark messages as read
        await privateMessageService.markMessagesAsRead(conversationId, tx);
        // Get messages after marking as read
        const messages = await privateMessageService.getPrivateMessages(
          conversationId,
          tx
        );
        return [messages];
      });

      // Format messages to match Message type
      const formattedMessages = messages.map((msg) => ({
        id: msg.id,
        sender: msg.sender,
        receiver: msg.receiver,
        content: msg.content,
        timestamp: msg.timeStamp,
        delivered: msg.delivered,
        isSelf: msg.sender === currentUser,
      }));

      // Send message history to user
      socket.emit("privateMessageHistory", {
        messages: formattedMessages,
        conversationId,
      });
    } catch (error) {
      console.error("Error retrieving private message history:", error);
      socket.emit("error", { message: "Failed to retrieve message history" });
    }
  });

  // Get all recent messages for a user
  socket.on("getAllRecentMessages", async (userId) => {
    try {
      const data = await privateMessageService.getAllPrivateMessages(userId);
      // Format data to match expected structure
      const formattedData = {
        filteredMessages: data.filteredMessages.map((msg) => ({
          id: msg.id,
          sender: msg.sender,
          content: msg.content,
          conversationId: msg.conversationId,
          receiver: msg.receiver,
          timeStamp: msg.timeStamp,
          delivered: msg.delivered,
        })),
        students: data.students.map((student) => ({
          id: student.id,
          name: student.name,
          email: student.email,
          schoolId: student.schoolId,
          createdAt: student.createdAt,
          grade: student.grade,
          rollNumber: student.rollNumber,
        })),
      };
      socket.emit("recentMessages", formattedData);
    } catch (error) {
      console.error("Error retrieving recent messages:", error);
      socket.emit("error", { message: "Failed to retrieve recent messages" });
    }
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      // Remove from userSockets
      userSockets.delete(user.username);
    }
    console.log("User disconnected", socket.id);
  });
});

// Start the server
const PORT = Number(process.env.PORT) || 5000;
const IP = getLocalIP();

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on:`);
  console.log(`- Local: http://localhost:${PORT}`);
  console.log(`- Network: http://${IP}:${PORT}`);
});
