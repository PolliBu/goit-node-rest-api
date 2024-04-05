import { User } from "../models/contactsModel.js";

export async function listContacts() {
  try {
    const contacts = await User.find();
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getContactById(contactId) {
  try {
    const contact = await User.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const deletedContact = await User.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
}

export async function addContact(name, email, phone) {
  try {
    const newContact = await User.create({ name, email, phone });
    return newContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function updateContactById(contactId, { name, email, phone }) {
  try {
    const updatedContact = await User.findByIdAndUpdate(
      contactId,
      { name, email, phone },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
}
