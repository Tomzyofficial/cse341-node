const express = require("express");

const contactController = require("../controllers/contacts");

const router = express.Router();

router.get("/", contactController.getContacts);

router.get("/:id", contactController.getSingleContact);

module.exports = router;
