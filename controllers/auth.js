const CustomError = require("../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const User = require("../models/User");

const register = errorWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username,
    email,
    password,
  });

  return res.status(201).json({
    user,
  });
});

module.exports = { register };
