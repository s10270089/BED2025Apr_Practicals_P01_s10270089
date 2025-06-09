const express = require("express");
const router = express.Router();
const controller = require("../controllers/reminderController");

router.get("/", controller.getAllReminders);
router.post("/", controller.createReminder);

module.exports = router;
