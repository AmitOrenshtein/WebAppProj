const PurchaseHistoryservice = require('../services/purchasehistory')

const createPurchaseHistory = async (req,res) => {
  const {userID,historyListofProducts}  = req.body
  const newPurchaseHistory = await PurchaseHistoryservice.createPurchaseHistory(userID,historyListofProducts);
  res.json(newPurchaseHistory)
}


const getPurchaseHistorys = async (req,res) => {
  const PurchaseHistorys = await PurchaseHistoryservice.getPurchaseHistorys();
  res.json(PurchaseHistorys);
}

const getPurchaseHistory = async (req,res) => {
  const purchasehistory = await PurchaseHistoryservice.getPurchaseHistoryById(req.params.id);
  if (!purchasehistory){
    return res.status(404).json({errors:['PurchaseHistory not found']});
  }
  res.json(purchasehistory);
}

//TODO get purchasehistory product list


const updatePurchaseHistory = async (req,res) => {
  const {name,purchasehistoryList, email}  = req.body
  const purchasehistory = await PurchaseHistoryservice.updatePurchaseHistory(req.params.id,userID, historyListofProducts);
  if (!purchasehistory){
    return res.status(404).json({errors:['PurchaseHistory not found']});
  }
  res.json(purchasehistory);
};


const deletePurchaseHistory = async (req,res) => {
  const purchasehistory = await PurchaseHistoryservice.deletePurchaseHistory(req.params.id);
  if (!purchasehistory){
    return res.status(404).json({errors:['PurchaseHistory not found']});
  }
  res.send();
}

module.exports = {
    createPurchaseHistory,
    getPurchaseHistorys,
    getPurchaseHistory,
    updatePurchaseHistory,
    deletePurchaseHistory
}