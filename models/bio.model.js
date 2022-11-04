/** @format */

const mongoose = require("mongoose");
const bioSchema = require("../schemas/bio.schema");

const BioModel = mongoose.model("bio", bioSchema);

// exports.addBio = async (body, imageId, imageUrl) => {
//   const bio = new BioModel({ body, imageId, imageUrl });
//   const saved = await bio.save();
//   return saved;
// };

exports.editBio = async (bioId, body) => {
  const id = await mongoose.Types.ObjectId(bioId);
  const bio = await BioModel.findOneAndUpdate(id, { body }, { new: true });
  return bio;
};

exports.editBioImage = async (bioId, imageUrl, imageId) => {
  const id = await mongoose.Types.ObjectId(bioId);
  const bio = await BioModel.findOneAndUpdate(
    id,
    { imageUrl, imageId },
    { new: true }
  );
  return bio;
};

exports.getBioById = async () => {
  const bio = BioModel.findOne({});
  return bio;
};
