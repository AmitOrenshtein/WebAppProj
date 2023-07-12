const express = require('express');
const productRouter = express.Router();

const productsController = require('../controllers/product')

productRouter.route('/')
    .get(productsController.getProducts)
    .post(productsController.createProduct)
//for recieving products from categroy 1
productRouter.route('/category/:searchedCategory1')
    .get(productsController.getProductsByCategory)
//for recieving products from categroy 1,2
productRouter.route('/category/:searchedCategory1/:searchedCategory2')
    .get(productsController.getProductsByCategory)
//for recieving products from categroy 1,2,3
productRouter.route('/category/:searchedCategory1/:searchedCategory2/:searchedCategory3')
    .get(productsController.getProductsByCategory)
//a group by query 
productRouter.route('/groupproductsbycat/:category')
    .get(productsController.groupProductsByCategory)
//a group by query 
productRouter.route('/groupproductsbybrand/:category')
    .get(productsController.groupProductsByBrand)


productRouter.route('/brand/:brand')
    .get(productsController.getProductsByBrand)


productRouter.route('/price/:minprice/:maxprice')
    .get(productsController.getProductsByPrice)

productRouter.route('/:id')
    .get(productsController.getProduct)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)


module.exports = productRouter;
