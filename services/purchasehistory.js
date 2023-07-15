const Purchasehistory = require('../models/purchasehistory')
const product = require('../models/product')
const productservice = require('../services/product')



const createPurchasehistory = async (userID, productList) => {
    //assuming we recieve JS obecjts and we need to extract the ID
    const productIDs = productList.map((currproduct)=>{return(currproduct.id)});
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

const getPurchasehistoryesByUsername = async(searchUsername) =>{
    let result = await Purchasehistory.find({Username : {$regex : searchUsername , $options : "i"}});
    console.log(result);
    return (result);
}
//returns all purchase historys for a user with full product info per history
const getPurchasehistoryByUserID = async(searchUserID) =>{
    // console.log(searchUserID)
    let result = await Purchasehistory.find({userID : searchUserID})
    // console.log(result)
    // console.log(result[0]["productList"])
    let finalResults = await Promise.all(result.map(async currRes => {
        const products = await Promise.all(currRes["productList"].map(async currproduct => await productservice.getProductById(currproduct)))
    // console.log(result)
        let currFinal = {
            "userID" : currRes["userID"],
            "purchaseDate" : currRes["purchaseDate"],
            "productList" : products,
        }
        return currFinal
    }))
    
    // console.log(finalresult)
    return finalResults
}
//can ignore this function
const getPurchasehistoryDetails = async(searchUserID) =>{
    currHistory = getPurchasehistoryByUserID(searchUserID);
    var productDetalis = {};
    curreHistory.array.forEach(currproduct => {
        productDetalis[currproduct.id, "id"] = currproduct.id;
        productDetalis[currproduct.id, "name"] = currproduct.name;
        productDetalis[currproduct.id, "price"] = currproduct.price;
        productDetalis[currproduct.id, "image"] = currproduct.image;
    })
    return (productDetalis);
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

const searchPurchaseHistory = async (userId, fromDate, toDate, category, minPrice, maxPrice) => {
    let filter = {userID: userId};
    if(fromDate || toDate) {
        filter.purchaseDate = {};
        if(fromDate)
            filter.purchaseDate.$gte = fromDate;
        if(toDate)
            filter.purchaseDate.$lte = toDate;
    }
    const result = await Purchasehistory.find(filter).populate('productList').exec();
    let filteredResult = result;
    if(minPrice || maxPrice || category) {
        filteredResult = result.filter(ph => {
            let sumFilter = true;
            let categoryFilter = !category;
            let sumPrice = 0;
            ph.productList.forEach(prod => {
                sumPrice += prod.price;
                categoryFilter = categoryFilter || prod.category === category
            });
            sumFilter = (!minPrice || sumPrice >= minPrice) &&
                (!maxPrice || sumPrice <= maxPrice);
            return categoryFilter && sumFilter;
        });
    }
    return filteredResult;
}

module.exports = {
    createPurchasehistory,
    getPurchasehistoryById,
    getPurchasehistoryesByUsername,
    getPurchasehistorys,
    updatePurchasehistory,
    getSalesByCategory,
    countByCategory,
    getSalesByDate,
    getPurchasehistoryByUserID,
    getPurchasehistoryDetails,
    deletePurchasehistory,
    searchPurchaseHistory
}