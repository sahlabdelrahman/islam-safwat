/** @format */

const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const featuredSchema = mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

featuredSchema.plugin(AutoIncrement, {
  id: "order_seq_featured",
  inc_field: "order",
});

module.exports = featuredSchema;
