const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

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

module.exports = { getContacts, getSingleContact };
