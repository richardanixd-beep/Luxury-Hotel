const express = require("express");
const { createBooking, listBookings } = require("../controllers/bookingController");
const { auth } = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/", auth, createBooking);
router.get("/", auth, listBookings);

module.exports = router;
