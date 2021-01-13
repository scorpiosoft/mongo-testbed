const express = require('express')
const router = express.Router();
const testController = require("../../controllers/testController");

// Matches with "/api/age"
router.get("/age", testController.getAge)
router.post("/age", testController.setAge)

// Matches with "/api/test/:id"
// router
//   .route("/:id")
//   .get(testController.findById)
//   .put(testController.update)
//   .delete(testController.remove);

module.exports = router;