const express = require("express");
const router = express.Router();

const {
  getAccessToRoute,
  getOperationRoute,
  getAdminRoute,
} = require("../middlewares/auth/auth");
const {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAll,
} = require("../controllers/cart");

router.post("/", getAccessToRoute, createCart);
router.put("/:id", getAccessToRoute, updateCart);
router.delete("/:id", getAccessToRoute, deleteCart);

// this id is user id
router.get("/find/:id", [getAccessToRoute, getOperationRoute], getCart);
router.get("/", [getAccessToRoute, getAdminRoute], getAll);

module.exports = router;
