const express = require("express");
const router = express.Router();

const ownerController = require("../controllers/owner.controller");
const { verifyToken, isOwner } = require("../middleware/auth.middleware");

router.get("/dashboard", verifyToken, isOwner, ownerController.getOwnerDashboard);

module.exports = router;
