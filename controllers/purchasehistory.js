const purchasehistoryservice = require('../services/purchasehistory')

const createPurchasehistory = async (req,res) => {
  //TODO - findout what is sent from the "buy" command and finetune accordingly
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

  const getPurchaseHistoryByLoggedUser = async(req,res) => {
    let userId;
    if(!req.session || !req.session.loggedUser) {
        return res.status(400).json({errors:['User is not logged in!']});
    } else {
        userId = req.session.loggedUser.id;
        console.log("get history for: " + userId);
        const purchasehistory = await purchasehistoryservice.getpurchasehistoryByUserID(userId);
        res.json(purchasehistory);
    }
  }

  const getpurchasehistoryByUserID = async(req,res) =>{
    const purchasehistory = await purchasehistoryservice.getpurchasehistoryByUserID(req.params.userID);
    if (!purchasehistory){
      return res.status(404).json({errors:['No purchase historys are found for this user']});
    }
    res.json(purchasehistory);
    }

  const getSalesByCategory = async(req,res) =>{
      const salesByCategory = await purchasehistoryservice.getSalesByCategory();
      res.json(salesByCategory);
    }
  
  const getSalesByDate = async(req,res)=>{
    const salesBtDate = await purchasehistoryservice.getSalesByDate();
    res.json(salesBtDate)
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
    getPurchaseHistoryByLoggedUser,
    getpurchasehistoryByUserID,
    updatePurchasehistory,
    getSalesByCategory,
    getSalesByDate,
    deletePurchasehistory
}
