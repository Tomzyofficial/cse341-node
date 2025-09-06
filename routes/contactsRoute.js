const express = require("express");

const contactController = require("../controllers/contacts");

const router = express.Router();

// Get all the contacts
router.get("/", contactController.getContacts);

// Get a single contact by ID
router.get("/:id", contactController.getSingleContact);

// Create a new contact
router.post("/", contactController.createContact);

// Update a contact by ID
router.put("/:id", contactController.updateContact);

// Delete a contact by ID
router.delete("/:id", contactController.deleteContact);

module.exports = router;
