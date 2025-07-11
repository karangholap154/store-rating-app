const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("✅ Database synced successfully");
  })
  .catch((err) => {
    console.error("❌ Failed to sync DB:", err.message);
  });

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/owner", require("./routes/owner.routes"));
app.use("/api/user", require("./routes/user.routes"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Store Rating App API" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
