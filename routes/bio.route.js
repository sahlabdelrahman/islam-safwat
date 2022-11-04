/** @format */

const router = require("express").Router();
const { verifyToken } = require("../middlewares/user.middleware");
const {
  addAndEditBio,
  editImage,
  getBio,
} = require("../controllers/bio.controller");
const validationAndUpload = require("../middlewares/validationAndUpload.middleware");

// router.post("/bio/add", add);
router.put("/bio/edit", verifyToken, addAndEditBio);
router.put(
  "/bio/edit-image",
  verifyToken,
  (req, res, next) => {
    req.flag = "bio";
    next();
  },
  validationAndUpload,
  editImage
);
router.get("/bio/get", getBio);

module.exports = router;
