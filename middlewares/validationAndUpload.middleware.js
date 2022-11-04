/** @format */

const cloudinary = require("cloudinary");

const validationAndUpload = async (req, res, next) => {
  const uploadSingle = require("./single.middleware").single(req.flag);
  await uploadSingle(req, res, async function (error) {
    if (req.validationErrors?.length > 0) {
      return res.status(400).json({ errors: req.validationErrors });
    } else {
      if (req.flag === "single") req.folder = "singles";
      else if (req.flag === "sheet") req.folder = "sheets";
      else if (req.flag === "featured") req.folder = "featured";
      else if (req.flag === "image") req.folder = "projects";
      else if (req.flag === "project-cover") req.folder = "projects";
      else if (req.flag === "new-cover") req.folder = "news";
      else if (req.flag === "new") req.folder = "news";
      else if (req.flag === "bio") req.folder = "bio";
      await cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: req.folder,
        },
        function (error, result) {
          if (error) {
            res.status(400).json({
              message: error.message,
            });
          }
          req.body.imageUrl = result?.secure_url;
          req.body.imageId = result?.public_id;
          req.body.width = result?.width;
          req.body.height = result?.height;
        }
      );
      next();
    }
  });
};

module.exports = validationAndUpload;
