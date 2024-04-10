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
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContact));

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  ctrlWrapper(createContact)
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrlWrapper(updateContactFavoriteStatus)
);

export default contactsRouter;
