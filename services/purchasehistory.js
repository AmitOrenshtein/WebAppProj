const Purchasehistory = require('../models/purchasehistory')
const product = require('../models/product')
const productservice = require('../services/product')



const createPurchasehistory = async (userID, productList) => {
    //assuming we recieve JS obecjts and we need to extract the ID
    const productIDs = productList.array.map((currproduct)=>{return(currproduct.id)})
    const purchasehistory = new Purchasehistory(
        {
            userID:userID,
            productList:productIDs,
            purchaseDate: new Date()
        });
    
    return await purchasehistory.save()
}


const getPurchasehistoryById = async(id) =>{
    return await Purchasehistory.findById(id)
}
const getPurchasehistorys = async() =>{
    return await Purchasehistory.find({})
}

const getpurchasehistoryByUserID = async(searchUserId) =>{
    let result = await Purchasehistory.find({userID : searchUserId});
    return (result);
}

const getPurchasehistoryesByUsername = async(searchUsername) =>{
    let result = await Purchasehistory.find({Username : {$regex : searchUsername , $options : "i"}});
    console.log(result);
    return (result);
}


//for graph
const getSalesByCategory = async() =>{
    let allHistorys = getPurchasehistorys();
    let allCategorys = []; 
    allHistorys.array.forEach(curreHistory => {curreHistory.array.forEach(currproduct =>{allCategorys.append(currproduct.category)});
    return (countByCategory(allCategorys))
    });
}
const countByCategory = async(allcategories) =>{
    var categorys = {}
    //will this loop work? 
    allcategories.array.forEach(currCategory =>{
        if(currCategory in categorys)
            categorys[currCategory] +=1
        else
            categorys[currCategory] =1
    })
    return(categorys)
}


//for graph
const getSalesByDate = async() =>{
    let allHistorys = getPurchasehistorys();
    let salesByDate = {}; 
    allHistorys.array.forEach(currHistory=>{(currDate = currHistory.Date)
    if(currDate in currDate)
        salesByDate[currDate] +=1;
    else 
        salesByDate[currDate] =1;
    });
    return (salesByDate)
};




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
    getpurchasehistoryByUserID,
    getPurchasehistoryesByUsername,
    getPurchasehistorys,
    updatePurchasehistory,
    getSalesByCategory,
    countByCategory,
    getSalesByDate,
    deletePurchasehistory
}