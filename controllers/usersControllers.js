import HttpError from "../helpers/HttpError.js";
import {
  createUser,
  findUserByEmail,
  loginUser,
} from "../services/usersServices.js";

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const newUser = await createUser(req.body);
    res.status(201).json({ newUser });
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
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw HttpError(401, "Email or password is wrong");
    }

    const token = jsonWebToken.sign(
      { userId: user._id },
      process.env.JWT_SECRET
    );

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
