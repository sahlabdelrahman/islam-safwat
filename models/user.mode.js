/** @format */

const mongoose = require("mongoose");
const userSchema = require("../schemas/user.schema");

const UserModel = mongoose.model("user", userSchema);

exports.userIsExisting = async (email) => {
  const emailIsExisting = await UserModel.findOne({ email });
  return emailIsExisting;
};

exports.registerNewUser = async (user) => {
  const newUser = await new UserModel(user);
  const savedUser = await newUser.save();

  return savedUser;
};

exports.updatePassword = async (password, email) => {
  const newData = await UserModel.findOneAndUpdate({ email }, { password });
  return newData;
};
