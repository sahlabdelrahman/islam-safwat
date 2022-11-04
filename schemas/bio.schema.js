/** @format */

const mongoose = require("mongoose");

const bioSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = bioSchema;
