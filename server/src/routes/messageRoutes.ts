import { Router } from "express";
import {
  addPrivateMessagesDeliver,
  addPrivateMessage,
  getPrivateMessages,
  getAllPrivateMessages,
} from "../controllers/messagesController";

const messageRouter: Router = Router();

messageRouter.post("/deliver", addPrivateMessagesDeliver);
messageRouter.route("/").post(addPrivateMessage).get(getPrivateMessages);
messageRouter.get("/:user", getAllPrivateMessages);

export default messageRouter;
