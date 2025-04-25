import { Router } from "express";

import { registerInstitutionHandler, getAllInstitutionHandler } from "../controllers/institutionalControllers";

const schoolRouter: Router = Router();

schoolRouter.post("/register", registerInstitutionHandler);
schoolRouter.get("/", getAllInstitutionHandler);

export default schoolRouter;
