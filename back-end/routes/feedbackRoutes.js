const express = require("express");
const { createFeedback, listFeedback } = require("../controllers/feedbackController");
const { auth } = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/", auth, createFeedback);
router.get("/", listFeedback);

module.exports = router;
