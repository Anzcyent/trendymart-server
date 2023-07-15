const express = require("express");
const router = express.Router();
const { getAccessToRoute, getOperationRoute } = require("../middlewares/auth/auth");
const { updateUser } = require("../controllers/user");

router.put("/:id", [getAccessToRoute, getOperationRoute], updateUser);

module.exports = router;
