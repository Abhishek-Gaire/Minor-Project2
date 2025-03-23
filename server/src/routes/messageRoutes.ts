import { Router } from "express";
import {
  addPrivateMessagesDeliver,
  addPrivateMessage,
  getPrivateMessages,
  getAllPrivateMessages,
  getConversationId,
} from "../controllers/messagesController";

const messageRouter: Router = Router();

messageRouter.post("/deliver", addPrivateMessagesDeliver);
messageRouter.post("/", addPrivateMessage);
messageRouter.get("/conversation/:conversationId", getPrivateMessages);
messageRouter.get("/conversations", getConversationId);
messageRouter.get("/user/:user", getAllPrivateMessages);

export default messageRouter;
