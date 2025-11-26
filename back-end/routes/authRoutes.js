// routes/authRoutes.js
const express = require("express");
// Use relative path to go up one level to controllers
const { register, login } = require("../controllers/authController");  
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
