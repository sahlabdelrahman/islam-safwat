/** @format */

const cloudinary = require("cloudinary");
const sharp = require("sharp");
const { Readable } = require("stream");

const bufferToStream = (buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};

let streamUpload = (file, folder, quality) => {
  return new Promise(async (resolve, reject) => {
    let data = await sharp(file.buffer).webp({ quality: quality }).toBuffer();

    let stream = cloudinary.uploader.upload_stream(
      { folder: folder },
      function (error, result) {
        if (result) {
          console.log("hello");
          console.log(result);
          resolve(result);
        } else {
          console.log("hello error");
          console.log(error);
          reject(error);
        }
      }
    );

    bufferToStream(data).pipe(stream);
  });
};

const validationAndUploadMultiple = async (req, res, next) => {
  const uploadMultiple = await require("./multipleCopy.middleware").array(
    req.flag
  );
  await uploadMultiple(req, res, async function (error) {
    if (req.validationErrors?.length > 0) {
      return res.status(400).json({
        errors: req.validationErrors,
      });
    } else {
      if (req.flag === "project") req.folder = "projects";
      else if (req.flag === "news") req.folder = "news";
      else if (req.flag === "test") req.folder = "test";
      const images = [];
      const files = req.files;

      for (let i = 0; i < files.length; i++) {
        let result = streamUpload(files[i], req.folder, 90)
          .then((res) => console.log("res =>", res))
          .catch((error) => console.log(error));

        console.log("1 =>", result);

        let result2 = streamUpload(files[i], req.folder, 1);

        console.log("2 =>", result2);
      }

      req.images = images;
      // next();
    }
  });
};

module.exports = validationAndUploadMultiple;
