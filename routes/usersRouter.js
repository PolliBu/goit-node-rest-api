import express from "express";
import { registerSchema, loginSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import {
  register,
  login,
  logout,
  current,
} from "../controllers/usersControllers.js";
import isAuthorization from "../middlewares/isAuthorization.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerSchema), register);

usersRouter.post("/login", validateBody(loginSchema), login);

usersRouter.post("/logout", isAuthorization, logout);

usersRouter.get("/current", isAuthorization, current);

export default usersRouter;
