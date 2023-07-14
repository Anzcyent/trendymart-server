const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title."],
      unique: [true, "This title has already been in use."],
    },
    description: {
      type: String,
      required: [true, "Please provide a description."],
    },
    image: {
      type: String,
      required: [true, "Please provide a image"],
    },
    categories: Array,
    size: String,
    color: String,
    price: {
      type: Number,
      required: [true, "Please provide a price."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);
