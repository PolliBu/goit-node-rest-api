import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import {
  createUser,
  findUserByEmail,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../services/usersServices.js";

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const newUser = await createUser(req.body);
    res
      .status(201)
      .json({ email: newUser.email, subscription: newUser.subscription });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email);
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcryptjs.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await logoutUser(userId);
    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await getCurrentUser(userId);
    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};
