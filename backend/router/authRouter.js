const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { register, login, getMe } = require("../controllers/authController");
router.post("/register", register);
router.post("/login", login);
router.get("/", protect, getMe);

module.exports = router;
