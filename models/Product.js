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
    size: Array,
    color: Array,
    price: {
      type: Number,
      required: [true, "Please provide a price."],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);
