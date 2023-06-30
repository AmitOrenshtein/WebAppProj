//const { describe } = require('node:test');
const Product = require('../models/products')

//feeding the CTOR with info
const createProduct = async (name,image,video,brand,category,amountInInventory,supplier) => {
    const product = new Product(
            {
                name:name,
                image:image,
                video:video,
                brand:brand,
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
const updateProduct = async (id, name,image,video,brand,category,amountInInventory,supplier) => {
    const product = await getProductById(id);
    if (!product)
        return null;
    product.name=name,
    product.image=image,
    product.video=video,
    product.brand=brand,
    product.category=category,
    product.amountInInventory=amountInInventory,
    product.supplier=supplier
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