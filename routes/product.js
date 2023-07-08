const express = require('express');
const productRouter = express.Router();

const productsController = require('../controllers/product')

productRouter.route('/')
    .get(productsController.getProducts)
    .post(productsController.createProduct)

productRouter.route('/category/:category')
    .get(productsController.getProductsByCategory)

productRouter.route('/brand/:brand')
    .get(productsController.getProductsByBrand)
    
/*
productRouter.route('/price/:price')
    .get(productsController.getProductsByPrice)
*/

productRouter.route('/:id')
    .get(productsController.getProduct)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)


module.exports = productRouter;
