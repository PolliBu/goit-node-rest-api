// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   pool: true,
//   host: "smtp.meta.ua",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "Polina_Sykretna@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "Polina_Sykretna@ukr.net",
//   from: "Polina_Sykretna@meta.ua",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));
