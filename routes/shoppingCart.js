const express = require("express");
const router = express.Router();
const shoppingCartController =require("../controllers/shoppingCart")

router.get("/getCart", shoppingCartController.getShoppingCart);
router.post("/addToCart", shoppingCartController.addToShoppingCart);
router.post("/removeFromCart", shoppingCartController.removeFromShoppingCart);


module.exports = router;
