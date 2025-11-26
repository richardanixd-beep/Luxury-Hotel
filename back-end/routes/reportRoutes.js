const express = require("express");
const { summary } = require("../controllers/reportController");
const { auth, adminOnly } = require("../middleware/authmiddleware");
const router = express.Router();

router.get("/summary", auth, adminOnly, summary);

module.exports = router;
