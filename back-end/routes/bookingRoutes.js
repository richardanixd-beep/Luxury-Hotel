const express = require("express");
const { createBooking, listBookings } = require("../controllers/bookingController");
const { auth, adminOnly } = require("../controllers/authController");

const router = express.Router();

router.post("/", auth, createBooking);
router.get("/", auth, listBookings);

module.exports = router;
