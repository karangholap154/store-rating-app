const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sequelize DB connection
const db = require("./models");
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("✅ Database synced successfully");
  })
  .catch((err) => {
    console.error("❌ Failed to sync DB:", err.message);
  });

// ROUTES
app.use("/api/auth", require("./routes/auth.routes"));     // already added
app.use("/api/admin", require("./routes/admin.routes"));   // ✅ ADD THIS LINE
app.use("/api/owner", require("./routes/owner.routes"));
app.use("/api/user", require("./routes/user.routes"));


// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Store Rating App API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
