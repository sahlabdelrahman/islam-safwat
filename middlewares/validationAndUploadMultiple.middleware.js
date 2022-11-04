/** @format */

const cloudinary = require("cloudinary");

const validationAndUploadMultiple = async (req, res, next) => {
  const uploadMultiple = await require("./multiple.middleware").array(req.flag);
  await uploadMultiple(req, res, async function (error) {
    if (req.validationErrors?.length > 0) {
      return res.status(400).json({
        errors: req.validationErrors,
      });
    } else {
      if (req.flag === "project") req.folder = "projects";
      else if (req.flag === "news") req.folder = "news";
      else if (req.flag === "single") req.folder = "singles";
      else if (req.flag === "sheet") req.folder = "sheets";
      const images = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        await cloudinary.v2.uploader.upload(
          path,
          { folder: req.folder },
          function (error, result) {
            if (error) {
              res.status(400).json({
                message: error.message,
              });
            }
            images.push({
              imageUrl: result?.secure_url,
              imageId: result?.public_id,
              width: result?.width,
              height: result?.height,
            });
          }
        );
      }
      req.images = images;
      next();
    }
  });
};

module.exports = validationAndUploadMultiple;
