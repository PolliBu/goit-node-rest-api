import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateContactFavoriteStatus,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import isAuthorization from "../middlewares/isAuthorization.js";

const contactsRouter = express.Router();

contactsRouter.get("/", isAuthorization, getAllContacts);

contactsRouter.get("/:id", isAuthorization, isValidId, getOneContact);

contactsRouter.delete("/:id", isAuthorization, isValidId, deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  isAuthorization,
  createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  isAuthorization,
  isValidId,
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  isAuthorization,
  isValidId,
  updateContactFavoriteStatus
);

export default contactsRouter;
