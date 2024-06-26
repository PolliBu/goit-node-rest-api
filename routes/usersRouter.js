import express from "express";
import {
  registerSchema,
  loginSchema,
  emailSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import {
  register,
  login,
  logout,
  current,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} from "../controllers/usersControllers.js";
import isAuthorization from "../middlewares/isAuthorization.js";
import { upload } from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerSchema), register);

usersRouter.post("/login", validateBody(loginSchema), login);

usersRouter.post("/logout", isAuthorization, logout);

usersRouter.get("/current", isAuthorization, current);

usersRouter.patch(
  "/avatars",
  isAuthorization,
  upload.single("avatar"),
  updateAvatar
);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post("/verify", resendVerifyEmail, validateBody(emailSchema));

export default usersRouter;
