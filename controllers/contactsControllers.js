import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contactsModel.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const contacts = await listContacts(owner);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = req.user.id;
    const contact = await getContactById(id, owner);
    if (!contact) {
      return next(HttpError(404));
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = req.user.id;
    const deletedContact = await removeContact(id, owner);
    if (!deletedContact) {
      return next(HttpError(404));
    }
    res.json(deletedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const owner = req.user.id;
    const existingContact = await Contact.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingContact) {
      return res.status(400).json({
        message: "Contact with the same email or phone already exists",
      });
    }
    const newContact = await addContact(name, email, phone, owner);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
    const owner = req.user.id;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    if (!name && !email && !phone && favorite === undefined) {
      return next("Body must have at least one field");
    }

    const updatedContact = await updateContactById(id, {
      name,
      email,
      phone,
      favorite,
      owner,
    });

    if (!updatedContact) {
      return next(HttpError(404));
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateContactFavoriteStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const owner = req.user.id;

    const updatedContact = await updateStatusContact(id, favorite, owner);
    if (!updatedContact) {
      return next(HttpError(404));
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
