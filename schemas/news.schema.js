/** @format */

const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    cover: {
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
      },
      height: {
        type: Number,
      },
    },
    items: [
      {
        type: {
          type: String,
          required: true,
        },
        imageUrl: {
          type: String,
        },
        imageId: {
          type: String,
        },
        width: {
          type: Number,
        },
        height: {
          type: Number,
        },
        caption: {
          type: String,
        },
        text: {
          type: String,
        },
        order: {
          type: Number,
        },
      },
    ],
    video: {
      videoUrl: {
        type: String,
      },
    },
    order: {
      type: Number,
    },
  },
  { timestamps: true }
);

newsSchema.plugin(AutoIncrement, {
  id: "order_seq_news",
  inc_field: "order",
});

module.exports = newsSchema;
