/** @format */

const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const singleSchema = mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    caption: {
      type: String,
    },
    order: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

singleSchema.plugin(AutoIncrement, {
  id: "order_seq_single",
  inc_field: "order",
});

module.exports = singleSchema;
