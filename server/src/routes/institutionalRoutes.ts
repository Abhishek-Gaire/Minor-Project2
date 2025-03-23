import { Router } from "express";

import { registerInstitutionHandler } from "../controllers/institutionalControllers";

const schoolRouter: Router = Router();

schoolRouter.post("/register", registerInstitutionHandler);

export default schoolRouter;
