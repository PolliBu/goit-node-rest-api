import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "Polina_Sykretna1@meta.ua",
    pass: META_PASSWORD,
  },
};

export const transporter = nodemailer.createTransport(nodemailerConfig);
