const CustomError = require("../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const Order = require("../models/Order");

// create order
const createOrder = errorWrapper(async (req, res, next) => {
  const order = await Order.create(req.body);

  return res.status(201).json({ order });
});

// update order
const updateOrder = errorWrapper(async (req, res, next) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  return res.status(200).json({ updatedOrder });
});

// delete order
const deleteOrder = errorWrapper(async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id);

  return res.status(200).json("Product has been deleted.");
});

// get user orders
const getUserOrders = errorWrapper(async (req, res, next) => {
  const orders = await Order.find({ userId: req.params.id });

  return res.status(200).json({ orders });
});

// get all
const getAll = errorWrapper(async (req, res, next) => {
  const orders = await Order.find();
  return res.status(200).json({ orders });
});

// get monthly income

const getMonthlyIncome = errorWrapper(async (req, res, next) => {
  const date = new Date();

  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
    { $match: { createdAt: { $gte: previousMonth } } },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);

  return res.status(200).json({ income });
});

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAll,
  getMonthlyIncome,
};
