import { Contact } from "../models/contact.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(id);
  if (!deletedContact) {
    return next(HttpError(404));
  }
  res.json(deletedContact);
};

export const createContact = async (req, res) => {
  const { name, email, phone, favorite = false } = req.body;
  const newContact = await Contact.create({ name, email, phone, favorite });
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  if (!name && !email && !phone && favorite === undefined) {
    return next("Body must have at least one field");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      favorite,
    },
    { new: true }
  );

  if (!updatedContact) {
    return next(HttpError(404));
  }

  return res.status(200).json(updatedContact);
};

export const updateContactFavoriteStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!updatedContact) {
    return next(HttpError(404));
  }
  res.status(200).json(updatedContact);
};
