const CustomError = require("../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const User = require("../models/User");

// update user
const updateUser = errorWrapper(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  return res.status(200).json({ updatedUser });
});

// delete user
const deleteUser = errorWrapper(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  return res.status(200).json("User has been deleted.");
});

// get user
const getUser = errorWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  return res.status(200).json({ user: { ...user._doc, password: undefined } });
});

// get all users
const getAllUsers = errorWrapper(async (req, res, next) => {
  const latestUsersRequest = req.query.new;

  const users = latestUsersRequest
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();

  return res.status(200).json({ users });
});

// get user stats

const getUserStats = errorWrapper(async (req, res, next) => {
  const date = new Date();

  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);

  return res.status(200).json({ data });
});

module.exports = { updateUser, deleteUser, getUser, getAllUsers, getUserStats };
