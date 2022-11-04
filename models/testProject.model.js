/** @format */

const mongoose = require("mongoose");
const testProjectSchema = require("../schemas/testProject.schema");

const TestProjectModel = mongoose.model("testProject", testProjectSchema);

exports.addNewProject = async (finalProject) => {
  const newProject = new TestProjectModel(finalProject);
  const savedProject = await newProject.save();
  return savedProject;
};

exports.addNewItem = async (projectId, finalItem) => {
  const id = await mongoose.Types.ObjectId(projectId);
  await TestProjectModel.updateOne(
    { _id: id },
    {
      $push: {
        items: finalItem,
      },
    }
  );

  const items = await TestProjectModel.findOne({
    _id: id,
  }).select("items");

  return items;
};

exports.addNewVideo = async (projectId, url) => {
  const id = await mongoose.Types.ObjectId(projectId);
  const video = { videoUrl: url };
  await TestProjectModel.updateOne(
    { _id: id },
    {
      video,
    }
  );

  const newVideo = await TestProjectModel.findOne({
    _id: id,
  }).select("video");
  return newVideo._doc;
};

exports.updateCoverWithNew = async (projectId, finalCover) => {
  const id = await mongoose.Types.ObjectId(projectId);
  await TestProjectModel.updateOne(
    { _id: id },
    {
      cover: finalCover,
    }
  );

  const cover = await TestProjectModel.findOne({
    _id: id,
  }).select("cover");

  return cover;
};

exports.deleteProjectById = async (projectId) => {
  const id = await mongoose.Types.ObjectId(projectId);
  const project = await TestProjectModel.findByIdAndDelete(id);
  return project;
};

exports.deleteImageById = async (projectId, imageId) => {
  const pId = await mongoose.Types.ObjectId(projectId);
  const project = await TestProjectModel.updateOne(
    { _id: pId },
    {
      $pull: {
        images: { imageId },
      },
    }
  );

  return project;
};

exports.getProjectById = async (projectId) => {
  const id = await mongoose.Types.ObjectId(projectId);
  const project = await TestProjectModel.findById(id);
  return project;
};

exports.getAllProjects = async () => {
  const projects = await TestProjectModel.find({}, {}, { sort: { order: 1 } });
  return projects;
};

exports.editProjectById = async (projectId, title, description) => {
  const id = await mongoose.Types.ObjectId(projectId);
  const project = await TestProjectModel.findByIdAndUpdate(id, {
    title,
    description,
  });
  return project;
};

exports.editImageById = async (projectId, imageId, caption) => {
  const id = await mongoose.Types.ObjectId(projectId);

  const project = await TestProjectModel.findOneAndUpdate(
    { _id: id, "images.imageId": imageId },
    {
      $set: {
        "images.$.caption": caption,
      },
    }
  );

  return project;
};

exports.reorder = async (items) => {
  const promises = items.map(async (item, index) => {
    let orderKey = index + 1;

    const promise = await TestProjectModel.updateOne(
      { _id: item._id },
      { $set: { order: orderKey } }
    );

    return promise;
  });
  const result = await Promise.all(promises);
  return result;
};

exports.reorderProjectImages = async (items, projectId) => {
  const id = await mongoose.Types.ObjectId(projectId);

  const project = await TestProjectModel.findByIdAndUpdate(id, {
    items: items,
  });
  return project;
};
