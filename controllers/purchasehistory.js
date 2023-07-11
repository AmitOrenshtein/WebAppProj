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

  const getPurchasehistoryByUserID = async(req,res) =>{
    console.log("controller activated")
    const purchasehistory = await purchasehistoryservice.getPurchasehistoryByUserID(req.params.userid);
    if (!purchasehistory){
      return res.status(404).json({errors:['No purchase historys are found for this user']});
    }
    res.json(purchasehistory);
    }

    const getPurchasehistoryDetails = async(req,res)=>{
      const purchasehistoryDetails = await purchasehistoryservice.getPurchasehistoryDetails(req.params.userID)
      if (!purchasehistoryDetails){
          return res.status(404).json({errors:['No purchase historys are found for this user']});
      }
      res.json(purchasehistoryDetails);

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
    getPurchasehistoryByUserID,
    updatePurchasehistory,
    getSalesByCategory,
    getSalesByDate,
    getPurchasehistoryDetails,
    deletePurchasehistory
}
