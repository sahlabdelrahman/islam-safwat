/** @format */

const fs = require("fs");
require("dotenv").config();

const {
  addNewFeatured,
  reorder,
  getAllFeatured,
  deletedFeaturedById,
} = require("../models/featured.model");

const { removeFromCloudinary } = require("../services/cloudinary");

exports.addFeatured = async (req, res) => {
  try {
    const finalFeatured = {
      imageUrl: req.body.imageUrl,
      imageId: req.body.imageId,
    };
    const featured = await addNewFeatured(finalFeatured);
    return res.status(200).json({
      msg: "Featured added successfully.",
      featured,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while adding featured.",
    });
  }
};

exports.getFeatured = async (req, res) => {
  try {
    const allFeatured = await getAllFeatured();
    return res.status(200).json(allFeatured);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while getting featured.",
    });
  }
};

exports.deleteFeatured = async (req, res) => {
  try {
    await removeFromCloudinary(req.body.imageId);
    await deletedFeaturedById(req.body.id);
    return res.status(200).json({
      msg: "Featured deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while deleting featured.",
    });
  }
};

exports.reorderFeatured = async (req, res) => {
  try {
    await reorder(req.body.featured);
    return res.status(200).json({
      msg: "Reorder done  successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while reordering.",
    });
  }
};
