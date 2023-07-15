const CustomError = require("../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const Product = require("../models/Product");

// create product
const createProduct = errorWrapper(async (req, res, next) => {
  const product = await Product.create(req.body);

  return res.status(201).json({ product });
});

// update product
const updateProduct = errorWrapper(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  return res.status(200).json({ updatedProduct });
});

// delete product
const deleteProduct = errorWrapper(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);

  return res.status(200).json("Product has been deleted.");
});

// get product
const getProduct = errorWrapper(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  return res.status(200).json({ product });
});

// get all products
const getAllProducts = errorWrapper(async (req, res, next) => {
  const latestProductsRequest = req.query.new;
  const category = req.query.category;

  let products;

  if (latestProductsRequest) {
    products = await Product.find().sort({ createdAt: -1 }).limit(5);
  } else if (category) {
    products = await Product.find({ categories: { $in: [category] } });
  } else {
    products = await Product.find();
  }

  return res.status(200).json({ products });
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
