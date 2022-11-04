/** @format */

const mongoose = require("mongoose");
const sheetSchema = require("../schemas/sheet.schema");

const SheetModel = mongoose.model("sheet", sheetSchema);

exports.addNewSheet = async (images) => {
  const sheets = await SheetModel.insertMany(images);
  return sheets;
};

exports.deleteSheetById = async (sheetId) => {
  const id = await mongoose.Types.ObjectId(sheetId);
  const sheet = await SheetModel.findByIdAndDelete(id);
  return sheet;
};

exports.getAllSheets = async () => {
  const sheets = await SheetModel.find({}, {}, { sort: { order: 1 } });
  return sheets;
};

exports.getSheetById = async (sheetId) => {
  const id = await mongoose.Types.ObjectId(sheetId);
  const sheet = SheetModel.findById(id);
  return sheet;
};

exports.editSheetById = async (sheetId, caption) => {
  const id = await mongoose.Types.ObjectId(sheetId);
  const sheet = await SheetModel.findByIdAndUpdate(id, { caption });
  return sheet;
};

exports.reorder = async (items) => {
  const promises = items.map(async (item, index) => {
    let orderKey = index + 1;

    const promise = await SheetModel.updateOne(
      { _id: item._id },
      { $set: { order: orderKey } }
    );

    return promise;
  });
  const result = await Promise.all(promises);
  return result;
};
