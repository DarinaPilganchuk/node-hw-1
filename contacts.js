const fs = require("fs").promises;
const path = require("path");

function generateId() {
  const charsSet =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
  let id = "";
  for (let i = 0; i < 21; i++) {
    const randomIndex = Math.floor(Math.random() * charsSet.length);
    id += charsSet[randomIndex];
  }
  return id;
}

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8")
    .then((result) => console.table(JSON.parse(result)))
    .catch((error) => console.error(error));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((result) =>
      console.table(JSON.parse(result).filter((el) => el.id === contactId))
    )
    .catch((error) => console.error(error));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((result) => {
      const contacts = JSON.parse(result);
      const index = contacts.findIndex((el) => el.id === contactId);
      if (index === -1) {
        return contacts;
      }
      contacts.splice(index, 1);
      fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
      console.table(contacts);
    })
    .catch((error) => console.error(error));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8")
    .then((result) => {
      const contacts = JSON.parse(result);
      const id = generateId();
      contacts.push({ id, name, email, phone });
      fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
      console.table(contacts);
    })
    .catch((error) => console.error(error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};