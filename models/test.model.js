/** @format */

const mongoose = require("mongoose");
const testSchema = require("../schemas/test.schema");

const TestModel = mongoose.model("test", testSchema);

exports.addNewTest = async (images) => {
  const test = await TestModel.insertMany(images);
  return test;
};

exports.getAllTest = async () => {
  const test = await TestModel.find({}, {}, { sort: { order: 1 } });
  return test;
};

// exports.getSingleById = async (singleId) => {
//   const id = await mongoose.Types.ObjectId(singleId);
//   const single = await SingleModel.findById(id);
//   return single;
// };

// exports.deleteSingleById = async (singleId) => {
//   const id = await mongoose.Types.ObjectId(singleId);
//   const single = await SingleModel.findByIdAndDelete(id);
//   return single;
// };

// exports.editSingleById = async (singleId, caption) => {
//   const id = await mongoose.Types.ObjectId(singleId);
//   const single = await SingleModel.findByIdAndUpdate(id, { caption });
//   return single;
// };

// exports.reorder = async (items) => {
//   const promises = items.map(async (item, index) => {
//     let orderKey = index + 1;

//     const promise = await SingleModel.updateOne(
//       { _id: item._id },
//       { $set: { order: orderKey } }
//     );

//     return promise;
//   });
//   const result = await Promise.all(promises);
//   return result;
// };
