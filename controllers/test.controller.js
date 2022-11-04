/** @format */

const fs = require("fs");
require("dotenv").config();

const { getAllTest, addNewTest } = require("../models/test.model");
// const { removeFromCloudinary } = require("../services/cloudinary");

exports.addTest = async (req, res) => {
  try {
    const images = await req.images.map((image, i) => ({
      ...image,
      caption: req.body.captions[i],
    }));

    const test = await addNewTest(images);

    return res.status(200).json({
      msg: "Images added successfully",
      test,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while creating the test.",
    });
  }
};

exports.getTest = async (req, res) => {
  try {
    const test = await getAllTest();
    return res.status(200).json(test);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while retrieving test.",
    });
  }
};

// exports.getSingle = async (req, res) => {
//   try {
//     const single = await getSingleById(req.body.id);
//     return res.status(200).json(single);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: error.message || "Some error occurred while retrieving single.",
//     });
//   }
// };

// exports.deleteSingle = async (req, res) => {
//   try {
//     await removeFromCloudinary(req.body.imageId);
//     await deleteSingleById(req.body.id);
//     return res.status(200).json({
//       msg: "Image deleted successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: error.message || "Some error occurred while deleting single.",
//     });
//   }
// };

// exports.editSingle = async (req, res) => {
//   try {
//     if (!req.body.caption) {
//       return res.status(400).json({ message: "Caption is required." });
//     }
//     if (req.body?.caption?.length > process.env.maxCharLength) {
//       return res
//         .status(400)
//         .json({ message: "Max length of caption is 2200 characters." });
//     }
//     await editSingleById(req.body.id, req.body.caption);
//     return res.status(200).json({
//       msg: "Image edited successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: error.message || "Some error occurred while updating single.",
//     });
//   }
// };

// exports.reorderSingles = async (req, res) => {
//   try {
//     await reorder(req.body.singles);
//     return res.status(200).json({
//       msg: "Reorder done  successfully.",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: error.message || "Some error occurred while reordering.",
//     });
//   }
// };
