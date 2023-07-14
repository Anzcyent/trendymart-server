const express = require("express");
const router = express.Router();
const auth = require("./auth");
const product = require("./product");
const cart = require("./cart");
const order = require("./order");
const user = require("./user");

router.use("/auth", auth);
router.use("/product", product);
router.use("/cart", cart);
router.use("/order", order);
router.use("/user", user);

module.exports = router;
