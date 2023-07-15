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

module.exports = { updateUser };
