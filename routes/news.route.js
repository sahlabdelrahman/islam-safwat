/** @format */

const router = require("express").Router();
const { verifyToken } = require("../middlewares/user.middleware");
const validationAndUploadMultiple = require("../middlewares/validationAndUploadMultiple.middleware");
const {
  addNews,
  addImage,
  addText,
  addVideo,
  deleteNews,
  deleteImage,
  deleteText,
  deleteVideo,
  editNews,
  editImage,
  editText,
  getNew,
  getNews,
  reorderNews,
  reorderImages,
  updateCover,
} = require("../controllers/news.controller");
const validationAndUpload = require("../middlewares/validationAndUpload.middleware");

router.post(
  "/news/add-news",
  verifyToken,
  (req, res, next) => {
    req.flag = "news";
    next();
  },
  validationAndUploadMultiple,
  addNews
);

router.post(
  "/news/add-image",
  verifyToken,
  (req, res, next) => {
    req.flag = "image";
    next();
  },
  validationAndUpload,
  addImage
);

router.post("/news/add-text", verifyToken, addText);

router.post("/news/add-video", verifyToken, addVideo);
router.delete("/news/delete-news", verifyToken, deleteNews);
router.delete("/news/delete-image", verifyToken, deleteImage);
router.delete("/news/delete-text", verifyToken, deleteText);
router.delete("/news/delete-video", verifyToken, deleteVideo);
router.post("/news/get-new", getNew);
router.get("/news/get-news", getNews);
router.put("/news/edit-news", verifyToken, editNews);
router.put("/news/edit-image", verifyToken, editImage);
router.put("/news/edit-text", verifyToken, editText);
router.put("/news/reorder-news", verifyToken, reorderNews);
router.put("/news/reorder-images", verifyToken, reorderImages);
router.put(
  "/news/update-cover",
  verifyToken,
  (req, res, next) => {
    req.flag = "new-cover";
    next();
  },
  validationAndUpload,
  updateCover
);

module.exports = router;
