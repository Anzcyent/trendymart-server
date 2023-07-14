const { Schema, model } = require("mongoose");

const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "UserId required."],
      unique: [true, "This title has already been in use."],
    },
    products: [
      {
        productId: String,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", CartSchema);
