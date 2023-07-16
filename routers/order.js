const express = require("express");
const { getAccessToRoute, getAdminRoute } = require("../middlewares/auth/auth");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAll,
  getMonthlyIncome,
} = require("../controllers/order");
const router = express.Router();

router.post("/", getAccessToRoute, createOrder);
router.put("/:id", [getAccessToRoute, getAdminRoute], updateOrder);
router.delete("/:id", [getAccessToRoute, getAdminRoute], deleteOrder);

// this id is user id
router.get("/find/:id", getAccessToRoute, getUserOrders);

router.get("/", [getAccessToRoute, getAdminRoute], getAll);
router.get("/income", [getAccessToRoute, getAdminRoute], getMonthlyIncome);

module.exports = router;
