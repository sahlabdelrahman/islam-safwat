/** @format */

const { verifyToken } = require("../middlewares/user.middleware");
const {
  addSheet,
  deleteSheet,
  getSheets,
  getSheet,
  editSheet,
  reorderSheets,
} = require("../controllers/sheet.controller");
const validationAndUpload = require("../middlewares/validationAndUpload.middleware");
const validationAndUploadMultiple = require("../middlewares/validationAndUploadMultiple.middleware");

const router = require("express").Router();

router.post(
  "/sheet/add-sheet",
  verifyToken,
  (req, res, next) => {
    req.flag = "sheet";
    next();
  },
  validationAndUploadMultiple,
  addSheet
);

router.post("/sheet/get-sheet", getSheet);
router.delete("/sheet/delete-sheet", verifyToken, deleteSheet);
router.put("/sheet/edit-sheet", verifyToken, editSheet);
router.get("/sheet/get-sheets", getSheets);
router.put("/sheet/reorder-sheets", verifyToken, reorderSheets);

module.exports = router;
