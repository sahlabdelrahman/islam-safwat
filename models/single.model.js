/** @format */

const mongoose = require("mongoose");
const singleSchema = require("../schemas/single.schema");

const SingleModel = mongoose.model("single", singleSchema);

exports.addNewSingle = async (images) => {
  const singles = await SingleModel.insertMany(images);
  return singles;
};

exports.getAllSingles = async () => {
  const singles = await SingleModel.find({}, {}, { sort: { order: 1 } });
  return singles;
};

exports.getSingleById = async (singleId) => {
  const id = await mongoose.Types.ObjectId(singleId);
  const single = await SingleModel.findById(id);
  return single;
};

exports.deleteSingleById = async (singleId) => {
  const id = await mongoose.Types.ObjectId(singleId);
  const single = await SingleModel.findByIdAndDelete(id);
  return single;
};

exports.editSingleById = async (singleId, caption) => {
  const id = await mongoose.Types.ObjectId(singleId);
  const single = await SingleModel.findByIdAndUpdate(id, { caption });
  return single;
};

exports.reorder = async (items) => {
  const promises = items.map(async (item, index) => {
    let orderKey = index + 1;

    const promise = await SingleModel.updateOne(
      { _id: item._id },
      { $set: { order: orderKey } }
    );

    return promise;
  });
  const result = await Promise.all(promises);
  return result;
};
