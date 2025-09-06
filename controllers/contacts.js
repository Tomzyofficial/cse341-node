const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

// Get all contacts
const getContacts = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single contact by ID
const getSingleContact = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .findOne({ _id: userId });

    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new contact
const createContact = async (req, res, next) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .insertOne(contact);

    res.status(201).json({ insertId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a contact by ID
const updateContact = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .findOneAndUpdate(
        { _id: userId },
        { $set: contact },
        { returnDocument: "after" }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a contact by ID
const deleteContact = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
