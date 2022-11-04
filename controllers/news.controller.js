/** @format */

require("dotenv").config();
const {
  addNewNews,
  addNewItem,
  addNewVideo,
  deleteNewsById,
  deleteImageById,
  deleteTextById,
  deleteVideoById,
  editNewsById,
  editImageById,
  editTextById,
  getNewById,
  getAllNews,
  reorder,
  reorderNewImages,
  updateCoverWithNew,
} = require("../models/news.model");
const {
  removeFolderFromCloudinary,
  removeFromCloudinary,
} = require("../services/cloudinary");

exports.addNews = async (req, res) => {
  try {
    const finalNews = {
      title: req.body.title,
      description: req.body.description,
      cover: {
        imageUrl: req.images[0].imageUrl,
        imageId: req.images[0].imageId,
        width: req.images[0].width,
        height: req.images[0].height,
      },
      items: req.images.map((image, i) => ({
        ...image,
        caption: req.body.captions[i],
        type: "image",
      })),
    };
    const newItem = await addNewNews(finalNews);

    return res.status(200).json({
      msg: "news added successfully",
      new: newItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while adding news.",
    });
  }
};

exports.addImage = async (req, res) => {
  try {
    const finalImage = {
      type: req.body.type,
      imageUrl: req.body.imageUrl,
      imageId: req.body.imageId,
      caption: req.body.caption,
      width: req.body.width,
      height: req.body.height,
    };
    const items = await addNewItem(req.body.id, finalImage);
    const item = items?.items?.filter(
      (item) => item.imageId === finalImage.imageId
    )[0];

    return res.status(200).json({
      msg: "Image added successfully",
      item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while adding image.",
    });
  }
};

exports.addText = async (req, res) => {
  try {
    const finalText = {
      type: req.body.type,
      text: req.body.text,
    };
    const items = await addNewItem(req.body.id, finalText);
    const item = items?.items?.filter(
      (item) => item.text === finalText.text
    )[0];
    return res.status(200).json({
      msg: "Text added successfully",
      item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while adding text.",
    });
  }
};

exports.addVideo = async (req, res) => {
  try {
    const video = await addNewVideo(req.body.id, req.body.url);

    return res.status(200).json({
      msg: "Video added successfully",
      video,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while adding video.",
    });
  }
};

exports.updateCover = async (req, res) => {
  try {
    const finalCover = {
      imageUrl: req.body.imageUrl,
      imageId: req.body.imageId,
      width: req.body.width,
      height: req.body.height,
    };
    const cover = await updateCoverWithNew(req.body.id, finalCover);

    return res.status(200).json({
      msg: "Cover updated successfully",
      cover,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while updating cover.",
    });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await deleteNewsById(req.body.id);
    return res.status(200).json({
      msg: "News deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while deleting news.",
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    await removeFromCloudinary(req.body.imageId);
    await deleteImageById(req.body.id, req.body.imageId);
    return res.status(200).json({
      msg: "Image deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while deleting image.",
    });
  }
};

exports.deleteText = async (req, res) => {
  try {
    await deleteTextById(req.body.id, req.body.textId);
    return res.status(200).json({
      msg: "Text deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while deleting text.",
    });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    await deleteVideoById(req.body.id);
    return res.status(200).json({
      msg: "Video deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while deleting video.",
    });
  }
};

exports.getNew = async (req, res) => {
  try {
    const news = await getNewById(req.body.id);
    res.status(200).json(news);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while getting new.",
    });
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await getAllNews();
    res.status(200).json(news);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while getting news.",
    });
  }
};

exports.editNews = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required." });
    }
    if (req.body?.title?.length > process.env.maxCharLength) {
      return res
        .status(400)
        .json({ message: "Max length of caption is 2200 characters." });
    }
    await editNewsById(req.body.id, req.body.title, req.body.description);
    return res.status(200).json({
      msg: "News edited successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while editing news.",
    });
  }
};

exports.editImage = async (req, res) => {
  try {
    if (!req.body.caption) {
      return res.status(400).json({
        msg: "Caption is required.",
      });
    }

    await editImageById(req.body.id, req.body.imageId, req.body.caption);
    return res.status(200).json({
      msg: "Image edited successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while editing image.",
    });
  }
};

exports.editText = async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({
        msg: "Text is required.",
      });
    }

    await editTextById(req.body.id, req.body.textId, req.body.text);
    return res.status(200).json({
      msg: "Text edited successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while updating text.",
    });
  }
};

exports.reorderNews = async (req, res) => {
  try {
    const result = await reorder(req.body.news);
    return res.status(200).json({
      msg: "Reorder done  successfully.",
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Some error occurred while reordering.",
    });
  }
};

exports.reorderImages = async (req, res) => {
  try {
    await reorderNewImages(req.body.images, req.body.newsId);
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
