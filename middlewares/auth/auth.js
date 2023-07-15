const CustomError = require("../../helpers/error/CustomError");
const errorWrapper = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { isTokenIncluded } = require("../../helpers/token/tokenHelpers");
const User = require("../../models/User");

const getAccessToRoute = errorWrapper(async (req, res, next) => {
  if (!isTokenIncluded(req))
    return next(
      new CustomError(
        "You have to login for this operation, no token found.",
        401
      )
    );

  const access_token = req.headers.authorization.split(":")[1];

  jwt.verify(
    access_token,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err)
        return next(
          new CustomError("You have to login for this operation.", 401)
        );

      const user = await User.findById(decoded._id).select("-password");

      req.user = user;

      next();
    }
  );
});

const getAdminRoute = errorWrapper(async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return next(
      new CustomError(
        "Only admins can access this route",
        403
      )
    );
  }
});

const getOperationRoute = errorWrapper(async (req, res, next) => {
    if (req.user._id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(
        new CustomError(
          "You don't have an authorization for this operation.",
          403
        )
      );
    }
  });

module.exports = { getAccessToRoute, getAdminRoute, getOperationRoute };
