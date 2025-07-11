const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/stores", verifyToken, userController.getAllStores);

router.post("/rate", verifyToken, userController.submitOrUpdateRating);

module.exports = router;
