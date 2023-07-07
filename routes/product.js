const express = require('express');
const productRouter = express.Router();

const productsController = require('../controllers/product')

productRouter.route('/')
    .get(productsController.getProducts)
    .post(productsController.createProduct)

productRouter.route('/:id')
    .get(productsController.getProduct)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)

productRouter.route('/:category')
    .get(productsController.getProductsByCategory)

module.exports = productRouter;
