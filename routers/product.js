const express = require("express");
const router = express.Router();

const { getAccessToRoute } = require("../middlewares/auth/auth");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/product");

router.post("/", getAccessToRoute, createProduct);
router.put("/:id", getAccessToRoute, updateProduct);
router.delete("/:id", getAccessToRoute, deleteProduct);
router.get("/:id", getProduct);
router.get("/", getAllProducts);

module.exports = router;
