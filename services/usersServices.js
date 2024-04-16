import jwt from "jsonwebtoken";
import { User } from "../models/usersModel.js";
import dotenv from "dotenv";

dotenv.config();

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const updateUserWithToken = async (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
};

export const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.hashPassword();
  await newUser.save();
  const user = await updateUserWithToken(newUser._id);
  return user;
};

// export const loginUser = async (email) => {
//   const user = await User.findOne({ email });
//   if (!user) return null;
//   const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

//   return {
//     token,
//     user,
//   };
// };

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
