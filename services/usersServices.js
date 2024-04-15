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

  return {
    token: jsonwebtoken.sign({ userId: user._id }, process.env.JWT_SECRET),
    user,
  };
};
