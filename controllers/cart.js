const CustomError = require("../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const Cart = require("../models/Cart");

// create cart
const createCart = errorWrapper(async (req, res, next) => {
  const cart = await Cart.create(req.body);

  return res.status(201).json({ cart });
});

// update cart
const updateCart = errorWrapper(async (req, res, next) => {
  const updatedCart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  return res.status(200).json({ updatedCart });
});

// delete cart
const deleteCart = errorWrapper(async (req, res, next) => {
  await Cart.findByIdAndDelete(req.params.id);

  return res.status(200).json("Product has been deleted.");
});

// get user cart
const getCart = errorWrapper(async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.params.id });

  return res.status(200).json({ cart });
});

// get all
const getAll = errorWrapper(async (req, res, next) => {
  const carts = await Cart.find();
  return res.status(200).json({ carts });
});

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAll,
};
