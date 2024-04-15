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

// signup
usersRouter.post("/register", validateBody(registerSchema), register);

// signin
usersRouter.post("/login", validateBody(loginSchema), login);

// logout
usersRouter.post("/logout", isAuthorization, logout);

// current user
usersRouter.get("/current", isAuthorization, current);

export default usersRouter;
