const Product = require('../models/product')

//feeding the CTOR with info
//maybe add req.body 
const createProduct = async (name, image, video, brand, description, category, amountInInventory, supplier,price) => {
    const product = new Product(
            {
                name:name,
                image:image,
                video:video,
                brand:brand,
                description:description,
                category:category,
                amountInInventory:amountInInventory,
                supplier:supplier,
                price:price
            });
    //saving to DB
    return await product.save()
}


const getProductById = async(id) =>{
    return await Product.findById(id)
    //that's a Mongoose function
}
//retuns all products
//can be used for homepage
const getProducts = async() =>{
    return await Product.find({})
}
//gets all products in category 1 and/or 2 and/or 3
const getProductsByCategory = async(searchedCategory1, searchedCategory2, searchedCategory3) =>{
    console.log("get categories services activated")
    let result = await Product.find({$or: [{category: searchedCategory1}, {category: searchedCategory2} ,{category: searchedCategory3}]});
    console.log(result);
    return (result);
}

const getProductsByBrand = async(searchedBrand) =>{
    let result = await Product.find({brand : searchedBrand});
    //console.log(result);
    return (result);
    //TODO make this work including the multiple GET commands 
}

const getProductsByPrice = async(minprice, maxprice) =>{
    let result = await Product.find({price : {$gte :minprice , $lte: maxprice}});
    console.log("inserive:", result);
    return (result);
    //TODO make this work including the multiple GET commands 
}

const groupProductsByCategory = async(category) =>{
    //console.log("groupBy service activated")
    let result = await Product.aggregate([ {$group: {_id:{category: "$category"} }}]);
    return (result);
}

const groupProductsByBrand = async(brand) =>{
    //console.log("groupBy service activated")
    let result = await Product.aggregate([ {$group: {_id:{brand: "$brand"} }}]);
    return (result);
}
const updateProduct = async (id, name,image,video,brand,description, category, amountInInventory, price) => {
    const product = await getProductById(id);
    if (!product)
        return null;
    if(!name)
        product.name = product.name;
    else  
        product.name = name;
    if(!image)
        product.image = product.image;
    else
        product.image = image;
    if(!video)
        product.video = product.video;
    else
        product.video = video;
    if(!brand)
        product.brand = product.brand;
    else
        product.brand = brand;
    if(!description)
        product.description = product.description;
    else
        product.description = description;
    if(!category)
        product.category = product.category;
    else
        product.category = category;
    if(!amountInInventory)
        product.amountInInventory = product.amountInInventory;
    else
        product.amountInInventory = amountInInventory;
    if(!price)
        product.price = product.price;
    else
        product.price = price;
    await product.save();
    return product;
}

const deleteProduct = async (id) => {
    const product = await getProductById(id);
    if (!product)
        return null;
    await product.deleteOne();
    return product;
}

const searchProducts = async (name, brand, category, supplier, minPrice, maxPrice) => {
    let filter = {};
    if(name)
        filter.name = {$regex : name , $options : "i"};
    if(brand)
        filter.brand = {$regex : name , $options : "i"};
    if(category)
        filter.category = category;
    if(supplier)
        filter.supplier = supplier;

    if(minPrice && maxPrice)
        filter.price = {$gte :minPrice , $lte: maxPrice};
    else if (minPrice)
        filter.price = {$gte :minPrice};
    else if(maxPrice)
        filter.price = {$lte :maxPrice};

    let result = await Product.find(filter);
    return result;
}

module.exports = {
    createProduct,
    getProductById,
    getProducts,
    getProductsByCategory,
    getProductsByBrand,
    getProductsByPrice,
    updateProduct,
    deleteProduct,
    groupProductsByBrand,
    groupProductsByCategory,
    searchProducts
}