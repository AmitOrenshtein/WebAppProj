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

const getProductsByCategory = async(searchedCategory) =>{
    let result = await Product.find({category : searchedCategory});
    console.log(result);
    return (result);
    //TODO make this work including the multiple GET commands 
}

const getProductsByBrand = async(searchedBrand) =>{
    let result = await Product.find({brand : searchedBrand});
    //console.log(result);
    return (result);
    //TODO make this work including the multiple GET commands 
}

const getProductsByPrice = async(minPrice, maxPrice) =>{
    let result = await Product.find({price : {$range : [minPrice ,maxPrice]}});
    //console.log(result);
    return (result);
    //TODO make this work including the multiple GET commands 
}
/* This is test function just to search by number
const getProductsByPrice = async(price) =>{
    const pricenum = parseInt(price)
    console.log(pricenum);

    let result = await Product.find({price : pricenum});
    //console.log(result);
    return (result);
    //TODO make this work including the multiple GET commands 
}
*/
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

module.exports = {
    createProduct,
    getProductById,
    getProducts,
    getProductsByCategory,
    getProductsByBrand,
    getProductsByPrice,
    updateProduct,
    deleteProduct
}