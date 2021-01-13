const router = require("express").Router();
const testController = require("../../controllers/testController");

router.route("/api/test/age")
  .get(testController.getAge)
  .post(testController.setAge);

// Matches with "/api/test/:id"
// router
//   .route("/:id")
//   .get(testController.findById)
//   .put(testController.update)
//   .delete(testController.remove);

module.exports = router;