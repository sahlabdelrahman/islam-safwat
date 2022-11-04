/** @format */

const multer = require("multer");
var path = require("path");
require("dotenv").config();

let storage = multer.diskStorage({});

function fileFilter(req, file, cb) {
  req.validationErrors = [];

  if (req.flag === "single" || req.flag === "sheet") {
    if (!req.body.caption) {
      req.validationErrors = [{ captionRequiredError: "Caption is required." }];
    }

    if (req.body.caption?.length > 2200) {
      req.validationErrors = [
        ...req.validationErrors,
        { captionLengthError: "Max length of caption is 2200 characters." },
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

  const size = req.headers["content-length"];
  if (size >= 10000000) {
    req.validationErrors = [
      ...req.validationErrors,
      {
        fileSizeError: "Image is too large",
      },
    ];
  }

  if (req.validationErrors.length > 0) {
    return cb(null, false, req.validationErrors);
  }

  cb(null, true);
}

let uploadSingle = multer({
  storage,
  fileFilter: fileFilter,
});

module.exports = uploadSingle;
