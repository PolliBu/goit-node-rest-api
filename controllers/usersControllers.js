import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import HttpError from "../helpers/HttpError.js";
import {
  createUser,
  findUserByEmail,
  logoutUser,
  getCurrentUser,
  updateUserWithToken,
} from "../services/usersServices.js";
import { User } from "../models/usersModel.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import { transporter } from "../helpers/transporter.js";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

dotenv.config();

const { BASE_URL } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsDir = path.join(__dirname, "../public/avatars");

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const newUser = await createUser({
      ...req.body,
      avatar: avatarURL,
      verificationToken,
    });
    const emailOptions = {
      from: "Polina_Sykretna1@meta.ua",
      to: email,
      subject: "Verify Email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
    };
    await transporter.sendMail(emailOptions);
    res.status(201).json({
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    if (!verificationToken) {
      throw new HttpError(400, "Verification token is required");
    }
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return next(HttpError(404, "User not found"));
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });
    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

export const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw HttpError(400, "missing required field email");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(404, "User not found");
    }
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }
    const newVerificationToken = nanoid();
    await User.findByIdAndUpdate(user._id, {
      verificationToken: newVerificationToken,
    });
    const emailOptions = {
      from: "Polina_Sykretna1@meta.ua",
      to: email,
      subject: "Verify Email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
    };
    await transporter.sendMail(emailOptions);
    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    if (!user.verify) {
      throw HttpError(401, "Email not verify");
    }
    const passwordCompare = await bcryptjs.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    await updateUserWithToken(user._id);
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

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, "No file");
    }
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const image = await Jimp.read(resultUpload);
    await image.resize(250, 250).quality(80).writeAsync(resultUpload);
    const avatarURL = `/avatars/${filename}`;
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};
