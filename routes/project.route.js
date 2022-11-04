/** @format */

const router = require("express").Router();

const {
  addProject,
  deleteProject,
  getProject,
  getProjects,
  deleteImage,
  deleteText,
  deleteVideo,
  addImage,
  addText,
  addVideo,
  editProject,
  editImage,
  editText,
  reorderProjects,
  reorderImages,
  updateCover,
} = require("../controllers/project.controller");
const { verifyToken } = require("../middlewares/user.middleware");
const validationAndUpload = require("../middlewares/validationAndUpload.middleware");
const validationAndUploadMultiple = require("../middlewares/validationAndUploadMultiple.middleware");

router.post(
  "/project/add-project",
  verifyToken,
  (req, res, next) => {
    req.flag = "project";
    next();
  },
  validationAndUploadMultiple,
  addProject
);

router.post(
  "/project/add-image",
  verifyToken,
  (req, res, next) => {
    req.flag = "image";
    next();
  },
  validationAndUpload,
  addImage
);

router.post("/project/add-text", verifyToken, addText);

router.post("/project/add-video", verifyToken, addVideo);

router.delete("/project/delete-project", verifyToken, deleteProject);
router.delete("/project/delete-image", verifyToken, deleteImage);
router.delete("/project/delete-text", verifyToken, deleteText);
router.delete("/project/delete-video", verifyToken, deleteVideo);
router.post("/project/get-project", getProject);
router.get("/project/get-projects", getProjects);
router.put("/project/edit-project", verifyToken, editProject);
router.put("/project/edit-image", verifyToken, editImage);
router.put("/project/edit-text", verifyToken, editText);
router.put("/project/reorder-projects", verifyToken, reorderProjects);
router.put("/project/reorder-images", verifyToken, reorderImages);
router.put(
  "/project/update-cover",
  verifyToken,
  (req, res, next) => {
    req.flag = "project-cover";
    next();
  },
  validationAndUpload,
  updateCover
);

module.exports = router;
