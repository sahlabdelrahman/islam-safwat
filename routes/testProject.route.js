/** @format */

const router = require("express").Router();

const {
  addProject,
  deleteProject,
  getProject,
  getProjects,
  deleteImage,
  addImage,
  addText,
  addVideo,
  editProject,
  editImage,
  reorderProjects,
  reorderImages,
  updateCover,
} = require("../controllers/testProject.controller");
const { verifyToken } = require("../middlewares/user.middleware");
const validationAndUpload = require("../middlewares/validationAndUpload.middleware");
const validationAndUploadMultiple = require("../middlewares/validationAndUploadMultiple.middleware");

router.post(
  "/testProject/add-project",
  verifyToken,
  (req, res, next) => {
    req.flag = "project";
    next();
  },
  validationAndUploadMultiple,
  addProject
);

router.post(
  "/testProject/add-image",
  verifyToken,
  (req, res, next) => {
    req.flag = "image";
    next();
  },
  validationAndUpload,
  addImage
);

router.post("/testProject/add-text", verifyToken, addText);

router.post("/testProject/add-video", verifyToken, addVideo);

router.delete("/testProject/delete-project", verifyToken, deleteProject);
router.delete("/testProject/delete-image", verifyToken, deleteImage);
router.post("/testProject/get-project", getProject);
router.get("/testProject/get-projects", getProjects);
router.put("/testProject/edit-project", verifyToken, editProject);
router.put("/testProject/edit-image", verifyToken, editImage);
router.put("/testProject/reorder-projects", verifyToken, reorderProjects);
router.put("/testProject/reorder-images", verifyToken, reorderImages);
router.put(
  "/testProject/update-cover",
  verifyToken,
  (req, res, next) => {
    req.flag = "project-cover";
    next();
  },
  validationAndUpload,
  updateCover
);

module.exports = router;
