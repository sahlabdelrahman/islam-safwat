/** @format */

const {
  editBio,
  editBioImage,
  getBioById,
  // addBio,
} = require("../models/bio.model");
const { removeFromCloudinary } = require("../services/cloudinary");

// exports.add = async (req, res) => {
//   try {
//     newBio = await addBio(req.body, req.imageId, req.imageUrl);
//     return res.status(200).json({
//       msg: "Bio added successfully.",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: error.message || "Some error occurred while updating bio.",
//     });
//   }
// };

exports.addAndEditBio = async (req, res) => {
  try {
    if (!req.body.body) {
      return res.status(400).json({
        msg: "Body is required.",
      });
    }
    const bio = await editBio(req.body.id, req.body.body);
    return res.status(200).json({
      msg: "Bio edited successfully.",
      bio,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while updating bio.",
    });
  }
};

exports.editImage = async (req, res) => {
  try {
    const bio = await editBioImage(
      req.body.id,
      req.body.imageUrl,
      req.body.imageId
    );
    await removeFromCloudinary(req.body.oldImageId);
    return res.status(200).json({
      msg: "Image edited successfully.",
      bio,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while editing image.",
    });
  }
};

exports.getBio = async (req, res) => {
  try {
    const bio = await getBioById();
    return res.status(200).json(bio);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while getting bio.",
    });
  }
};
