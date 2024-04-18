import { Contact } from "../models/contactsModel.js";

export async function listContacts(owner) {
  try {
    const contacts = await Contact.find({ owner });
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getContactById(contactId, owner) {
  try {
    const contact = await Contact.findOne({ _id: contactId, owner });
    return contact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function removeContact(contactId, owner) {
  try {
    const deletedContact = await Contact.findOneAndDelete({
      _id: contactId,
      owner,
    });
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
}

export async function addContact(name, email, phone, owner, favorite = false) {
  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      favorite,
      owner,
    });
    return newContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function updateContactById(
  contactId,
  { name, email, phone, owner, favorite }
) {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      { name, email, phone, favorite },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateStatusContact(contactId, favorite, owner) {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      { favorite },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
