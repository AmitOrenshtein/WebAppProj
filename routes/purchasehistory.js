const express = require('express');
const purchasehistoryRouter = express.Router();

const purchasehistoryController = require('../controllers/purchasehistory')


purchasehistoryRouter.route('/')
    .get(purchasehistoryController.getPurchasehistorys)
    .post(purchasehistoryController.createPurchasehistory)

purchasehistoryRouter.route('/UserID/:UserID')
    .get(purchasehistoryController.getpurchasehistoryByUserID)


purchasehistoryRouter.route('/:id')
    .get(purchasehistoryController.getPurchasehistory)
    .put(purchasehistoryController.updatePurchasehistory)
    .delete(purchasehistoryController.deletePurchasehistory)

module.exports = purchasehistoryRouter

