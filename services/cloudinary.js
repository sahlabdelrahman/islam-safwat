/** @format */

const cloudinary = require("cloudinary");

exports.removeFromCloudinary = async (imageId) => {
  await cloudinary.v2.uploader.destroy(imageId, function (error, result) {
    // console.log(error, result);
  });
};

exports.removeFolderFromCloudinary = async (folderName) => {
  // Delete all images inside cloudinary folder to escape "Folder is not empty" error
  await cloudinary.v2.api.delete_resources_by_prefix(
    `${folderName}/`,
    function (result) {}
  );
  // Delete cloudinary folder "now is empty folder"
  await cloudinary.v2.api.delete_folder(folderName, function (error, result) {
    console.log(error, result);
  });
};
