/** @format */

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({});

function fileFilter(req, file, cb) {
  req.validationErrors = [];

  if (req.flag === "project" || req.flag === "news") {
    if (!req.body.title) {
      req.validationErrors = [{ titleRequiredError: "Title is required" }];
    }

    if (req.body.title?.length > 2200) {
      req.validationErrors = [
        ...req.validationErrors,
        { titleLengthError: "Max length of title is 2200 characters." },
      ];
    }
  }

  const ext = path.extname(file.originalname).toLocaleLowerCase();
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    req.validationErrors = [
      ...req.validationErrors,
      {
        fileValidationError:
          "Invalid file type. Only jpg, jpeg, png and gif image files are allowed.",
      },
    ];
  }

  if (req.validationErrors.length > 0) {
    return cb(null, false, req.validationErrors);
  }

  cb(null, true);
}

const uploadMultiple = multer({
  storage,
  fileFilter,
});

module.exports = uploadMultiple;
