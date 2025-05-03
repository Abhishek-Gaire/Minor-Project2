import express, { Router } from "express";
import {
  createClass,
  deleteClass,
  getClasses,
  updateClass,
} from "../controllers/onlineClassesControllers";
import { authenticate } from "../middleware/dashboardAuth";

const classSessionRoutes: Router = express.Router();

classSessionRoutes.use(authenticate);

classSessionRoutes.post("/create", createClass);
classSessionRoutes.delete("/delete/:classId", deleteClass);
classSessionRoutes.get("/get/:userId", getClasses);
classSessionRoutes.put("/update/:classId", updateClass);

export { classSessionRoutes as classSessionRouter };
