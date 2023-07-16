const express = require("express");
const { payment } = require("../controllers/stripe");
const router = express.Router();

router.post("/payment", payment );

module.exports = router;
