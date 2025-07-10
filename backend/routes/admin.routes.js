const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

// Admin Dashboard (Test Route)
router.get("/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({
    message: "Welcome, Admin!",
    user: req.user,
  });
});

// Admin: Create Store
router.post("/create-store", verifyToken, isAdmin, adminController.createStore);

// Admin: Create User
router.post("/create-user", verifyToken, isAdmin, adminController.createUser);

// Admin: Get total users, stores, ratings
router.get("/stats", verifyToken, isAdmin, adminController.getDashboardStats);

router.get("/users", verifyToken, isAdmin, adminController.getAllUsers);

router.get("/stores", verifyToken, isAdmin, adminController.getAllStores);


module.exports = router;
