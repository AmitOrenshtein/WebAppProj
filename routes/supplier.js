const express = require('express');
const supplierRouter = express.Router();

const suppliersController = require('../controllers/supplier')

supplierRouter.route('/')
    .get(suppliersController.getSuppliers)
    .post(suppliersController.createSupplier)

supplierRouter.route('/:id')
    .get(suppliersController.getSupplier)
    .get(suppliersController.getSupplierProductList)
    .put(suppliersController.updateSupplier)
    .delete(suppliersController.deleteSupplier)
//TODO get supplier product list

module.exports = supplierRouter;
