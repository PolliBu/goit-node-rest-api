import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";
import usersRouter from "./routes/usersRouter.js";

import nodemailer from "nodemailer";

dotenv.config();

const { MONGODB_URL, PORT } = process.env;
const app = express();

mongoose
  .connect(MONGODB_URL)

  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

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

const transporter = nodemailer.createTransport(nodemailerConfig);

const emailOptions = {
  from: "Polina_Sykretna@meta.ua",
  to: "Polina_Sykretna@ukr.net",
  subject: "Test email",
  text: "<p><strong>Test email</strong> from localhost:3000</p>",
};

transporter
  .sendMail(emailOptions)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));
