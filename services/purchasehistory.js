const Purchasehistory = require('../models/purchasehistory')

const createPurchasehistory = async (userID, historyproductList) => {
    const purchasehistory = new Purchasehistory(
            {
                userID:userID,
                historyproductList:historyproductList
                //TODO: create purchasehistory list
            });
    return await purchasehistory.save()
}


const getPurchasehistoryById = async(id) =>{
    return await Purchasehistory.findById(id)
}
const getPurchasehistorys = async() =>{
    return await Purchasehistory.find({})
}

//TODO get purchasehistory product list like in supplier

const updatePurchasehistory = async (id, userID, historyListOfProducts) => {
    const purchasehistory = await getPurchasehistoryById(id);
    if (!purchasehistory)
        return null;
    if(!userID)
        purchasehistory.userID = purchasehistory.userID;
    else  
        purchasehistory.userID = userID;
    if(!historyListOfProducts)
        purchasehistory.historyListOfProducts = purchasehistory.historyListOfProducts;
    else
        purchasehistory.historyListOfProducts = historyListOfProducts;
    await purchasehistory.save();
    return purchasehistory;
}

const deletePurchasehistory = async (id) => {
    const purchasehistory = await getPurchasehistoryById(id);
    if (!purchasehistory)
        return null;
    await purchasehistory.deleteOne();
    return purchasehistory;
}

module.exports = {
    createPurchasehistory,
    getPurchasehistoryById,
    getPurchasehistorys,
    updatePurchasehistory,
    deletePurchasehistory
}