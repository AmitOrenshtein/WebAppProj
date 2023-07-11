const express = require('express');
const purchasehistoryRouter = express.Router();

const purchasehistoryController = require('../controllers/purchasehistory')


purchasehistoryRouter.route('/')
    .get(purchasehistoryController.getPurchasehistorys)
    .post(purchasehistoryController.createPurchasehistory)

purchasehistoryRouter.route('/userid/:userid')
    .get(purchasehistoryController.getPurchasehistoryByUserID)

purchasehistoryRouter.route('/getpurcahsedetails/:userid') 
    .get(purchasehistoryController.getPurchasehistoryDetails)

purchasehistoryRouter.route('/salesbycategory') 
    .get(purchasehistoryController.getSalesByCategory)

purchasehistoryRouter.route('/salesbydate') 
    .get(purchasehistoryController.getSalesByDate)

purchasehistoryRouter.route('/:id')
    .get(purchasehistoryController.getPurchasehistory)
    .put(purchasehistoryController.updatePurchasehistory)
    .delete(purchasehistoryController.deletePurchasehistory)

module.exports = purchasehistoryRouter

