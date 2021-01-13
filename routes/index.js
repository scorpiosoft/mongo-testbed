const path = require("path");
const router = require("express").Router();
const testRoutes = require("./api/test");

// API Routes
router.use("/api/test", testRoutes);

// If no API routes are hit, send the React app
router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/public/index.html"))
);

module.exports = router;