const purchasehistoryservice = require('../services/purchasehistory')

const createPurchasehistory = async (req,res) => {
    const {userID, productList}  = req.body
    const newPurchasehistory = await purchasehistoryservice.createPurchasehistory(userID, productList);
    res.json(newPurchasehistory)
  }
  
  
  const getPurchasehistorys = async (req,res) => {
    const Purchasehistorys = await purchasehistoryservice.getPurchasehistorys();
    res.json(Purchasehistorys);
  }

  const getPurchasehistory = async (req,res) => {
    const purchasehistory = await purchasehistoryservice.getPurchasehistoryById(req.params.id);
    if (!purchasehistory){
      return res.status(404).json({errors:['purchase history not found']});
    }
    res.json(purchasehistory);
  }

  const getpurchasehistoryByUserID = async(res,req) =>{
    const purchasehistory = await purchasehistoryservice.getpurchasehistoryByUserID(req.params.userID);
    if (!purchasehistory){
      return res.status(404).json({errors:['No purchase historys are found for this user']});
    }
    res.json(purchasehistory);
    }
  
    const updatePurchasehistory = async (req,res) => {
        const {userID, productList}  = req.body
        const purchasehistory = await purchasehistoryservice.updatePurchasehistory(req.params.id,userID, productList);
        if (!purchasehistory){
          return res.status(404).json({errors:['purchasehistory not found']});
        }
        res.json(purchasehistory);
      };
      
      
      const deletePurchasehistory = async (req,res) => {
        const purchasehistory = await purchasehistoryservice.deletePurchasehistory(req.params.id);
        if (!purchasehistory){
          return res.status(404).json({errors:['purchasehistory not found']});
        }
        res.send();
      }
      
  

  module.exports = {
    createPurchasehistory,
    getPurchasehistorys,
    getPurchasehistory,
    getpurchasehistoryByUserID,
    updatePurchasehistory,
    deletePurchasehistory
}
