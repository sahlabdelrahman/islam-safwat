/** @format */

const { verifyToken } = require("../middlewares/user.middleware");
const {
  addFeatured,
  reorderFeatured,
  deleteFeatured,
  getFeatured,
} = require("../controllers/featured.controller");
const validationAndUpload = require("../middlewares/validationAndUpload.middleware");

const router = require("express").Router();

router.post(
  "/featured/add-featured",
  verifyToken,
  (req, res, next) => {
    req.flag = "featured";
    next();
  },
  validationAndUpload,
  addFeatured
);
router.delete("/featured/delete-featured", verifyToken, deleteFeatured);
router.get("/featured/get-featured", getFeatured);
router.put("/featured/reorder-featured", verifyToken, reorderFeatured);

module.exports = router;
