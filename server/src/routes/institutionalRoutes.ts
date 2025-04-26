import { Router } from "express";

import { registerInstitutionHandler, getAllInstitutionHandler, getInstitutionByIdHandler } from "../controllers/institutionalControllers";

const schoolRouter: Router = Router();

schoolRouter.post("/register", registerInstitutionHandler);
schoolRouter.get("/", getAllInstitutionHandler);
schoolRouter.get("/:id", getInstitutionByIdHandler);

export default schoolRouter;
