/** @format */

const fs = require("fs");
require("dotenv").config();

const {
  addNewSingle,
  getSingleById,
  getAllSingles,
  deleteSingleById,
  editSingleById,
} = require("../models/single.model");
const { removeFromCloudinary } = require("../services/cloudinary");

exports.addSingle = async (req, res) => {
  try {
    const finalSingle = {
      imageUrl: req.body.imageUrl,
      imageId: req.body.imageId,
      caption: req.body.caption,
    };

    await addNewSingle(finalSingle);

    return res.status(200).json({
      msg: "Image added successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getSingles = async (req, res) => {
  try {
    const singles = await getAllSingles();
    return res.status(200).json(singles);
  } catch (error) {
    console.log(error);
  }
};

exports.getSingle = async (req, res) => {
  try {
    const single = await getSingleById(req.body.id);
    return res.status(200).json(single);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteSingle = async (req, res) => {
  try {
    await removeFromCloudinary(req.body.imageId);
    await deleteSingleById(req.body.id);
    return res.status(200).json({
      msg: "Image deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editSingle = async (req, res) => {
  try {
    if (!req.body.caption) {
      return res.status(400).json({ message: "Caption is required." });
    }
    if (req.body?.caption?.length > process.env.maxCharLength) {
      return res
        .status(400)
        .json({ message: "Max length of caption is 2200 characters." });
    }
    await editSingleById(req.body.id, req.body.caption);
    return res.status(200).json({
      msg: "Image edited successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
