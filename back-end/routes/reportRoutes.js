const express = require("express");
const { summary } = require("../controller/reportController");
const { auth, adminOnly } = require("../middleware/authmiddleware");
const router = express.Router();

router.get("/summary", auth, adminOnly, summary);

module.exports = router;
