const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");

router.post("/userId", cartController.addToCart);
router.get("/userId", cartController.getCart);
router.put("/userId", cartController.updateQty);
router.delete("/userId/productId", cartController.deleteItem);

module.exports = router;
