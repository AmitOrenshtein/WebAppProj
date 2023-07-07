const Supplier = require('../models/supplier');
const { getProductById } = require('./product');

const createSupplier = async (name,productList, email) => {
    const supplier = new Supplier(
            {
                name:name,
                email:email,
                productList: productList
                //TODO - create/ choose products for this supplier 
            });
    return await supplier.save()
}


const getSupplierById = async(id) =>{
    return await Supplier.findById(id)
}
const getSuppliers = async() =>{
    return await Supplier.find({})
}

const getSupplierProductList = async (id) =>{
    const thisSupplier = getSupplierById(id);
    const prodcutIds = thisSupplier.productList;
    const productObjects = prodcutIds.map(element => {
        getProductById(element);
        //TODO - make sure this get command works
    });
    return productObjects;
}
const updateSupplier = async (id, name, productList, email) => {
    const supplier = await getSupplierById(id);
    if (!supplier)
        return null;
    if(!name)
        supplier.name = supplier.name;
    else  
        supplier.name = name;
    if(!productList)
        supplier.productList = supplier.productList;
    else
        supplier.productList = productList;
    if(!email)
        supplier.email = supplier.email;
    else
        supplier.email = email;
    await supplier.save();
    return supplier;
}

const deleteSupplier = async (id) => {
    const supplier = await getSupplierById(id);
    if (!supplier)
        return null;
    await supplier.deleteOne();
    return supplier;
}

module.exports = {
    createSupplier,
    getSupplierById,
    getSuppliers,
    getSupplierProductList,
    updateSupplier,
    deleteSupplier
}