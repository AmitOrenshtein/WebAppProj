const express = require('express');
const router = express.Router();

const productsController = require('../controllers/product')

router.route('/')
    .get(productsController.getProducts)
    .post(productsController.createProduct)

router.route('/:id')
    .get(productsController.getProduct)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)

module.exports = router;
