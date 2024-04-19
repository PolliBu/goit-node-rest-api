import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";
import dotenv from "dotenv";

dotenv.config();

export const getUserByToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.id;
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new HttpError(404, "User not found");
  }
};

const isAuthorization = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(HttpError(401, "Not authorized"));
  }

  try {
    const currentUser = await getUserByToken(token);
    if (!currentUser) {
      return next(HttpError(401, "Not authorized"));
    }
    if (!currentUser.token) {
      return next(HttpError(401, "Not authorized"));
    }
    req.user = currentUser;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

export default isAuthorization;
