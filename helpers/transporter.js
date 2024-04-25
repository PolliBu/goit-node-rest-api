import nodemailer from "nodemailer";
// import HttpError from "./HttpError.js";
import dotenv from "dotenv";

dotenv.config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "Polina_Sykretna@meta.ua",
    pass: META_PASSWORD,
  },
};

export const transporter = nodemailer.createTransport(nodemailerConfig);

// export const sendVerificationEmail = async (email, verificationToken) => {
//   try {
//     const emailOptions = {
//       from: "Polina_Sykretna@meta.ua",
//       to: email,
//       subject: "Verify Email",
//       html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
//     };

//     await transporter.sendMail(emailOptions);
//   } catch (error) {
//     throw new HttpError(500, "Failed to send verification email");
//   }
// };
