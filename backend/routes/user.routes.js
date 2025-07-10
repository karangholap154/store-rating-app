const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// View/search stores
router.get("/stores", verifyToken, userController.getAllStores);

// Submit/update rating
router.post("/rate", verifyToken, userController.submitOrUpdateRating);

module.exports = router;
