/** @format */

const router = require("express").Router();

const { verifyToken } = require("../middlewares/user.middleware");
const { getTest, addTest } = require("../controllers/test.controller");
const validationAndUploadMultiple = require("../middlewares/validationAndUploadMultiple.middleware");

router.post(
  "/test/add-test",
  verifyToken,
  (req, res, next) => {
    req.flag = "test";
    next();
  },
  validationAndUploadMultiple,
  addTest
);
// router.post("/test/get-single", verifyToken, getSingle);
// router.delete("/test/delete-single", verifyToken, deleteSingle);
// router.put("/test/edit-single", verifyToken, editSingle);
router.get("/test/get-test", getTest);
// router.put("/test/reorder-singles", verifyToken, reorderSingles);

module.exports = router;
