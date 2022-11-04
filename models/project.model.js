/** @format */

const mongoose = require("mongoose");
const projectSchema = require("../schemas/project.schema");

const ProjectModel = mongoose.model("project", projectSchema);

exports.addNewProject = async (finalProject) => {
  const newProject = new ProjectModel(finalProject);
  const savedProject = await newProject.save();
  return savedProject;
};

exports.addNewItem = async (projectId, finalItem) => {
  const id = await mongoose.Types.ObjectId(projectId);
  await ProjectModel.updateOne(
    { _id: id },
    {
      $push: {
        items: finalItem,
      },
    }
  );

  const items = await ProjectModel.findOne({
    _id: id,
  }).select("items");

  return items;
};

exports.addNewVideo = async (projectId, url) => {
  const id = await mongoose.Types.ObjectId(projectId);
  const video = { videoUrl: url };
  await ProjectModel.updateOne(
    { _id: id },
    {
      video,
    }
  );

  const newVideo = await ProjectModel.findOne({
    _id: id,
  }).select("video");
  return newVideo._doc;
};

exports.updateCoverWithNew = async (projectId, finalCover) => {
  const id = await mongoose.Types.ObjectId(projectId);
  await ProjectModel.updateOne(
    { _id: id },
    {
      cover: finalCover,
    }
  );

  const cover = await ProjectModel.findOne({
    _id: id,
  }).select("cover");

  return cover;
};

exports.deleteProjectById = async (projectId) => {
  const id = await mongoose.Types.ObjectId(projectId);
  const project = await ProjectModel.findByIdAndDelete(id);
  return project;
};

exports.deleteImageById = async (projectId, imageId) => {
  const pId = await mongoose.Types.ObjectId(projectId);
  const project = await ProjectModel.updateOne(
    { _id: pId },
    {
      $pull: {
        items: { imageId },
      },
    }
  );

  return project;
};

exports.deleteVideoById = async (projectId) => {
  const pId = await mongoose.Types.ObjectId(projectId);
  const project = await ProjectModel.updateOne(
    { _id: pId },
    { video: { videoUrl: "" } }
  );

  return project;
};

exports.deleteTextById = async (projectId, textId) => {
  const pId = await mongoose.Types.ObjectId(projectId);

  const project = await ProjectModel.updateOne(
    { _id: pId },
    {
      $pull: {
        items: { _id: textId },
      },
    }
  );

  return project;
};

exports.getProjectById = async (projectId) => {
  const id = await mongoose.Types.ObjectId(projectId);
  const project = await ProjectModel.findById(id);
  return project;
};

exports.getAllProjects = async () => {
  const projects = await ProjectModel.find({}, {}, { sort: { order: 1 } });
  return projects;
};

exports.editProjectById = async (projectId, title, description) => {
  const id = await mongoose.Types.ObjectId(projectId);
  const project = await ProjectModel.findByIdAndUpdate(id, {
    title,
    description,
  });
  return project;
};

exports.editImageById = async (projectId, imageId, caption) => {
  const id = await mongoose.Types.ObjectId(projectId);

  const project = await ProjectModel.findOneAndUpdate(
    { _id: id, "items.imageId": imageId },
    {
      $set: {
        "items.$.caption": caption,
      },
    }
  );

  return project;
};

exports.editTextById = async (projectId, textId, text) => {
  const id = await mongoose.Types.ObjectId(projectId);

  const project = await ProjectModel.findOneAndUpdate(
    { _id: id, "items._id": textId },
    {
      $set: {
        "items.$.text": text,
      },
    }
  );

  return project;
};

exports.reorder = async (items) => {
  const promises = items.map(async (item, index) => {
    let orderKey = index + 1;

    const promise = await ProjectModel.updateOne(
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

  const project = await ProjectModel.findByIdAndUpdate(id, {
    items: items,
  });
  return project;
};
