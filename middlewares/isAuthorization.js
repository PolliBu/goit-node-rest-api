import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";
import dotenv from "dotenv";

dotenv.config();

const checkToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    return userId;
  } catch (error) {
    return null;
  }
};

const getUserByIdService = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new HttpError(404, "User not found");
  }
};

const isAuthorization = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(HttpError(401, "Not authorized"));
  }

  const userId = checkToken(token);

  if (!userId) {
    return next(HttpError(401, "Not authorized"));
  }

  try {
    const currentUser = await getUserByIdService(userId);
    if (!currentUser || currentUser.token !== token) {
      return next(new HttpError(401, "Not authorized"));
    }
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthorization;
