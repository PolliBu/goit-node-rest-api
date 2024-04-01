import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) return null;
    const deleteContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deleteContact[0];
  } catch (error) {
    console.log(error.message);
  }
}

export async function addContact(name, email, phone) {
  try {
    const newContact = { id: nanoid(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function updateContactById(contactId, { name, email, phone }) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }

    const updatedContact = { ...contacts[index] };

    updatedContact.name = name ? name : updatedContact.name;
    updatedContact.email = email ? email : updatedContact.email;
    updatedContact.phone = phone ? phone : updatedContact.phone;

    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
}
