const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
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
    amount: {
      type: Number,
      required: [true, "Amount required."],
    },
    address: {
      type: Object,
      required: [true, "Address required."],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", OrderSchema);
