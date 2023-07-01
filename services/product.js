//const { describe } = require('node:test');
const Product = require('../models/product')

//feeding the CTOR with info
//maybe add req.body 
const createProduct = async (name, image, video, brand, description, category, amountInInventory, supplier) => {
    const product = new Product(
            {
                name:name,
                image:image,
                video:video,
                brand:brand,
                description:description,
                category:category,
                amountInInventory:amountInInventory,
                supplier:supplier
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

//TODO: find out how to update only specific parameters
const updateProduct = async (id, name,image,video,brand,description, category, amountInInventory,supplier) => {
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
    if(!supplier)
        product.supplier = product.supplier;
    else
        product.supplier = supplier;
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
    updateProduct,
    deleteProduct
}