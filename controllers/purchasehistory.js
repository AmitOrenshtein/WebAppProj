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
        if(!req.session || !req.session.loggedUser) {
            return res.status(400).json({errors:['User is not logged in!']});
        } else {
            let userId = req.session.loggedUser.id;
            const purchaseHistory = await purchasehistoryservice.getPurchasehistoryByUserID(userId);
            res.json(purchaseHistory);
        }
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

  const searchPurchaseHistory = async (req, res) => {
      const {isAdmin, fromDate, toDate, category, minPrice, maxPrice}  = req.body;
      let isAdminBoolean = (isAdmin && (isAdmin === 'true' || isAdmin === true));
      if(!req.session || !req.session.loggedUser) {
          return res.status(400).json({errors:['User is not logged in!']});
      } else if(isAdminBoolean && !req.session.loggedUser.isAdmin) {
          return res.status(400).json({errors:['User is not admin!']});
      } else {
          let userId = req.session.loggedUser.id;
          const result = await purchasehistoryservice.searchPurchaseHistory(isAdminBoolean, userId, fromDate, toDate, category, minPrice, maxPrice);
          res.json(result);
      }
  }

  module.exports = {
    createPurchasehistory,
    getPurchasehistorys,
    getPurchasehistory,
    getPurchasehistoryByUserID,
    getPurchaseHistoryByLoggedUser,
    updatePurchasehistory,
    getSalesByCategory,
    getSalesByDate,
    getPurchasehistoryDetails,
    deletePurchasehistory,
    searchPurchaseHistory
}
