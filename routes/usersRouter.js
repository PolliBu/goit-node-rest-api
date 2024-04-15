import express from "express";
import { registerSchema, loginSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import { register, login } from "../controllers/usersControllers.js";

const usersRouter = express.Router();

// signup
usersRouter.post("/register", validateBody(registerSchema), register);

// signin
usersRouter.post("/login", validateBody(loginSchema), login);

export default usersRouter;
