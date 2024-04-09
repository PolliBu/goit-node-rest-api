import { Contact } from "../models/contactsModel.js";

export async function listContacts() {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
}

export async function addContact(name, email, phone, favorite = false) {
  try {
    const newContact = await Contact.create({ name, email, phone, favorite });
    return newContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function updateContactById(
  contactId,
  { name, email, phone, favorite }
) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone, favorite },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateStatusContact(contactId, favorite) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
