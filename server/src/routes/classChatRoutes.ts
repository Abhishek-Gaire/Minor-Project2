import { Router } from "express";
import {
  addClassMessage,
  getAllClassChats,
} from "../controllers/classChatController";

const classChatRouter: Router = Router();

classChatRouter.get("/:className", getAllClassChats);
classChatRouter.post("/", addClassMessage);

export default classChatRouter;
