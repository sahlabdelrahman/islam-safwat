/** @format */

const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const sheetSchema = mongoose.Schema(
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

sheetSchema.plugin(AutoIncrement, {
  id: "order_seq_sheet",
  inc_field: "order",
});

module.exports = sheetSchema;
