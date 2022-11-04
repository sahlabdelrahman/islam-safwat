/** @format */

const mongoose = require("mongoose");
const featuredSchema = require("../schemas/featured.schema");

const FeaturedModel = mongoose.model("featured", featuredSchema);

exports.addNewFeatured = async (finalFeatured) => {
  const newFeatured = await new FeaturedModel(finalFeatured);
  const savedFeatured = await newFeatured.save();
  return savedFeatured;
};

exports.deletedFeaturedById = async (featuredId) => {
  const id = await mongoose.Types.ObjectId(featuredId);
  const featured = await FeaturedModel.findByIdAndDelete(id);
  return featured;
};

exports.getAllFeatured = async () => {
  const allFeatured = await FeaturedModel.find({}, {}, { sort: { order: 1 } });
  return allFeatured;
};

exports.reorder = async (items) => {
  const promises = items.map(async (item, index) => {
    let orderKey = index + 1;

    const promise = await FeaturedModel.updateOne(
      { _id: item._id },
      { $set: { order: orderKey } }
    );

    return promise;
  });
  const result = await Promise.all(promises);
  return result;
};
