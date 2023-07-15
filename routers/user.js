const express = require("express");
const router = express.Router();
const {
  getAccessToRoute,
  getOperationRoute,
  getAdminRoute,
} = require("../middlewares/auth/auth");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} = require("../controllers/user");

router.put("/:id", [getAccessToRoute, getOperationRoute], updateUser);
router.delete("/:id", [getAccessToRoute, getOperationRoute], deleteUser);
router.get("/stats", [getAccessToRoute, getAdminRoute], getUserStats);
router.get("/:id", [getAccessToRoute, getAdminRoute], getUser);
router.get("/", [getAccessToRoute, getAdminRoute], getAllUsers);


module.exports = router;
