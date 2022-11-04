/** @format */
const fs = require("fs");
require("dotenv").config();

const {
  addNewSheet,
  getAllSheets,
  getSheetById,
  deleteSheetById,
  editSheetById,
  reorder,
} = require("../models/sheet.model");
const { removeFromCloudinary } = require("../services/cloudinary");

exports.addSheet = async (req, res) => {
  try {
    const images = await req.images.map((image, i) => ({
      ...image,
      caption: req.body.captions[i],
    }));

    const sheets = await addNewSheet(images);
    return res.status(200).json({
      msg: "Sheets added successfully",
      sheets,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while adding sheet.",
    });
  }
};

exports.getSheets = async (req, res) => {
  try {
    const sheets = await getAllSheets();
    return res.status(200).json(sheets);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while retrieving sheets.",
    });
  }
};

exports.getSheet = async (req, res) => {
  try {
    const sheet = await getSheetById(req.body.id);
    return res.status(200).json(sheet);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while retrieving sheets.",
    });
  }
};

exports.deleteSheet = async (req, res) => {
  try {
    await removeFromCloudinary(req.body.imageId);
    await deleteSheetById(req.body.id);
    return res.status(200).json({
      msg: "Sheet deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while deleting sheet.",
    });
  }
};

exports.editSheet = async (req, res) => {
  try {
    if (!req.body.caption) {
      return res.status(400).json({
        message: "Caption is required.",
      });
    }
    if (req.body?.caption?.length > process.env.maxCharLength) {
      return res
        .status(400)
        .json({ message: "Max length of caption is 2200 characters." });
    }

    await editSheetById(req.body.id, req.body.caption);
    return res.status(200).json({
      msg: "Sheet edited successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while updating sheet.",
    });
  }
};

exports.reorderSheets = async (req, res) => {
  try {
    await reorder(req.body.sheets);
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
