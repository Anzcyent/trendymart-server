const CustomError = require("../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const User = require("../models/User");
const { isMatchPassword } = require("../helpers/auth/authHelpers");
const jwt = require("jsonwebtoken");

// register
const register = errorWrapper(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username,
    email,
    password,
  });

  return res.status(201).json({
    user: { ...user._doc, password: undefined },
  });
});

// login
const login = errorWrapper(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user)
    return next(
      new CustomError("There is no user with this email address.", 404)
    );

  if (!isMatchPassword(password, user.password))
    return next(new CustomError("Wrong password!", 400));

  const access_token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );

  return res.status(200).json({
    user: { ...user._doc, password: undefined },
    access_token,
  });
});

module.exports = { register, login };
