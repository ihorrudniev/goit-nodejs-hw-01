const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.relative(__dirname, "db/contacts.json");

const readContent = async () => {
  const content = await fs.readFile(contactsPath, "utf8");
  const result = JSON.parse(content);
  return result;
};

const listContacts = async () => {
  return readContent();
};

const getContactById = async (contactId) => {
  console.log(typeof contactId);
  const contacts = await readContent();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readContent();
  const arrContacts = contacts.filter((contact) => contact.id !== contactId);
  const removeContact = contacts.find((contact) => contact.id === contactId);

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(arrContacts)
  );

  return removeContact;
};

const addContact = async (name, email, phone) => {
  const contact = await readContent();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contact.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(contact, null, 2)
  );
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
