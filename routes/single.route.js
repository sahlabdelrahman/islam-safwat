/** @format */

const router = require("express").Router();

const { verifyToken } = require("../middlewares/user.middleware");
const {
  addSingle,
  getSingle,
  getSingles,
  deleteSingle,
  editSingle,
  reorderSingles,
} = require("../controllers/single.controller");
const validationAndUpload = require("../middlewares/validationAndUpload.middleware");
const validationAndUploadMultiple = require("../middlewares/validationAndUploadMultiple.middleware");

router.post(
  "/single/add-single",
  verifyToken,
  (req, res, next) => {
    req.flag = "single";
    next();
  },
  validationAndUploadMultiple,
  addSingle
);
router.post("/single/get-single", verifyToken, getSingle);
router.delete("/single/delete-single", verifyToken, deleteSingle);
router.put("/single/edit-single", verifyToken, editSingle);
router.get("/single/get-singles", getSingles);
router.put("/single/reorder-singles", verifyToken, reorderSingles);

module.exports = router;
