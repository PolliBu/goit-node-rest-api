import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
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
    const deletedContact = await removeContact(id);
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
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      return next("Body must have at least one field");
    }

    const updatedContact = await updateContactById(id, req.body);
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
    const { contactId } = req.params;
    const { favorite } = req.body;

    const updatedContact = await updateStatusContact(contactId, favorite);
    if (!updatedContact) {
      return next(HttpError(404));
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
