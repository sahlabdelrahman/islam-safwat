/** @format */

const mongoose = require("mongoose");
const newsSchema = require("../schemas/news.schema");

const NewsModel = mongoose.model("new", newsSchema);

exports.addNewNews = async (finalNews) => {
  const newNews = new NewsModel(finalNews);
  const savedNews = await newNews.save();
  return savedNews;
};

exports.addNewItem = async (projectId, finalItem) => {
  const id = await mongoose.Types.ObjectId(projectId);
  await NewsModel.updateOne(
    { _id: id },
    {
      $push: {
        items: finalItem,
      },
    }
  );

  const items = await NewsModel.findOne({
    _id: id,
  }).select("items");

  return items;
};

exports.updateCoverWithNew = async (newsId, finalCover) => {
  const id = await mongoose.Types.ObjectId(newsId);
  await NewsModel.updateOne(
    { _id: id },
    {
      cover: finalCover,
    }
  );

  const cover = await NewsModel.findOne({
    _id: id,
  }).select("cover");

  return cover;
};

exports.addNewVideo = async (newsId, url) => {
  const id = await mongoose.Types.ObjectId(newsId);
  const video = { videoUrl: url };
  await NewsModel.updateOne(
    { _id: id },
    {
      video,
    }
  );

  const newVideo = await NewsModel.findOne({
    _id: id,
  }).select("video");

  return newVideo;
};

exports.deleteNewsById = async (newsId) => {
  const id = await mongoose.Types.ObjectId(newsId);
  const news = await NewsModel.findByIdAndDelete(id);
  return news;
};

exports.deleteImageById = async (newsId, imageId) => {
  const pId = await mongoose.Types.ObjectId(newsId);
  const news = await NewsModel.updateOne(
    { _id: pId },
    {
      $pull: {
        items: { imageId },
      },
    }
  );

  return news;
};

exports.deleteTextById = async (projectId, textId) => {
  const pId = await mongoose.Types.ObjectId(projectId);

  const project = await NewsModel.updateOne(
    { _id: pId },
    {
      $pull: {
        items: { _id: textId },
      },
    }
  );

  return project;
};

exports.deleteVideoById = async (newsId) => {
  const nId = await mongoose.Types.ObjectId(newsId);
  const news = await NewsModel.updateOne(
    { _id: nId },
    { video: { videoUrl: "" } }
  );

  return news;
};

exports.getNewById = async (newsId) => {
  const id = await mongoose.Types.ObjectId(newsId);
  const news = await NewsModel.findById(id);
  return news;
};

exports.getAllNews = async () => {
  const news = await NewsModel.find({}, {}, { sort: { order: 1 } });
  return news;
};

exports.editNewsById = async (newsId, title, description) => {
  const id = await mongoose.Types.ObjectId(newsId);
  const news = await NewsModel.findByIdAndUpdate(id, {
    title,
    description,
  });
  return news;
};

exports.editImageById = async (newsId, imageId, caption) => {
  const id = await mongoose.Types.ObjectId(newsId);

  const news = await NewsModel.findOneAndUpdate(
    { _id: id, "items.imageId": imageId },
    {
      $set: {
        "items.$.caption": caption,
      },
    }
  );

  return news;
};

exports.editTextById = async (newsId, textId, text) => {
  const id = await mongoose.Types.ObjectId(newsId);

  const news = await NewsModel.findOneAndUpdate(
    { _id: id, "items._id": textId },
    {
      $set: {
        "items.$.text": text,
      },
    }
  );

  return news;
};

exports.reorder = async (items) => {
  const promises = items.map(async (item, index) => {
    let orderKey = index + 1;

    const promise = await NewsModel.updateOne(
      { _id: item._id },
      { $set: { order: orderKey } }
    );

    return promise;
  });
  const result = await Promise.all(promises);
  return result;
};

exports.reorderNewImages = async (items, newsId) => {
  const id = await mongoose.Types.ObjectId(newsId);

  const newItem = await NewsModel.findByIdAndUpdate(id, {
    items: items,
  });
  return newItem;
};
