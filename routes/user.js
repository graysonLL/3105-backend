const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile/:userId", authMiddleware, userController.profile);

module.exports = router;
