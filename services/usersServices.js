import jwt from "jsonwebtoken";
import jsonWebToken from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/usersModel.js";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const updateUserWhisToken = async (id) => {
  const { SECRET_KEY } = process.env;
  const token = jsonWebToken.sign({ id }, SECRET_KEY);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
};

export const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.hashPassword();
  await newUser.save();
  const user = updateUserWhisToken(newUser._id);
  return user;
};

export const loginUser = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

  return {
    token,
    user,
  };
};

export const logoutUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return null;

  user.token = null;
  await user.save();

  return user;
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
};
