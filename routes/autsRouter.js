import express from "express";
import { registerSchema, loginSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import { register } from "../controllers/autsControllers.js";

const authRouter = express.Router();

// signup
authRouter.post("/register", validateBody(registerSchema), register);

// signin
// router.post("/login", validateBody(loginSchema), login);

export default authRouter;
