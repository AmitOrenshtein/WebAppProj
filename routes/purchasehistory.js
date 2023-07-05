const express = require('express');
const purchasehistoryRouter = express.Router();

const purchasehistorysController = require('../controllers/purchasehistory')

purchasehistoryRouter.route('/')
    .get(purchasehistorysController.getPurchasehistorys)
    .post(purchasehistorysController.createPurchasehistory)

purchasehistoryRouter.route('/:id')
    .get(purchasehistorysController.getPurchasehistory)
    .put(purchasehistorysController.updatePurchasehistory)
    .delete(purchasehistorysController.deletePurchasehistory)
//TODO get purchasehistory product list that works with GET

module.exports = purchasehistoryRouter;
