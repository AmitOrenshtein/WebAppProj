const Purchasehistory = require('../models/purchasehistory')


const createPurchasehistory = async (userID, productList) => {
    const purchasehistory = new Purchasehistory(
            {
                userID:userID,
                productList:productList
                //TODO initiate create list functions in cart model
            });
    return await purchasehistory.save()
}


const getPurchasehistoryById = async(id) =>{
    return await Purchasehistory.findById(id)
}
const getPurchasehistorys = async() =>{
    return await Purchasehistory.find({})
}

const getPurchasehistoryesByUsername = async(searchUsername) =>{
    let result = await Purchasehistory.find({Username : {$regex : searchUsername , $options : "i"}});
    console.log(result);
    return (result);
}

//TODO - make this function blocked? maybe we want it imutable 
const updatePurchasehistory = async (id,userID, prodcutList) => {
    const purchasehistory = await getPurchasehistoryById(id);
    if (!purchasehistory)
        return null;
    if(!userID)
        purchasehistory.userID = purchasehistory.userID;
    else  
        purchasehistory.userID = userID;
    if(!prodcutList)
        purchasehistory.prodcutList = purchasehistory.prodcutList;
    else
        purchasehistory.prodcutList = prodcutList;
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
    getPurchasehistoryesByUsername,
    getPurchasehistorys,
    updatePurchasehistory,
    deletePurchasehistory
}