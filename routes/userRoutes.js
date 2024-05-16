const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// User registration route
router.post("/signup", userController.registerUser);

// User login route
// router.post("/login", userController.loginUser);

// // Get user profile route (protected)
// router.get("/profile", authMiddleware, userController.getUserProfile);

// // Update user profile route (protected)
// router.put("/profile", authMiddleware, userController.updateUserProfile);

// // Delete user account route (protected)
// router.delete("/profile", authMiddleware, userController.deleteUserAccount);

module.exports = router;
