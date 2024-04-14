// const bcrypt = require("bcrypt");

// const jwt = require("jsonwebtoken");

import { User } from "../models/usersModel.js";

// const { HttpError } = require("../helpers");

// const { SECRET_KEY } = process.env;

export const register = async (req, res) => {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ email });

  //   if (user) {
  //     throw HttpError(409, "Email already in use");
  //   }

  //   const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create(req.body);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw HttpError(401, "Email or password invalid");
//   }
//   const passwordCompare = await bcrypt.compare(password, user.password);
//   if (!passwordCompare) {
//     throw HttpError(401, "Email or password invalid");
//   }

//   const payload = {
//     id: user._id,
//   };

//   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

//   res.json({
//     token,
//   });
// };

// module.exports = {
//   register: ctrlWrapper(register),
//   login: ctrlWrapper(login),
// };
