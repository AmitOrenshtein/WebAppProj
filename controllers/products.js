const Productservice = require('../services/products')

const createProduct = async (req,res) => {
  const newProduct = await Productservice.createProduct(req.body.name,image,video,descrpition,category,amountInInventory,supplier);
  res.json(newProduct)
}


const getProducts = async (req,res) => {
  const Products = await Productservice.getProducts();
  res.json(Products);
}

const getProduct = async (req,res) => {
  const product = await Productservice.getProductById(req.params.id);
  if (!product){
    return res.status(404).json({errors:['Product not found']});
  }
  res.json(product);
}
//TODO - make it work with only specific paremeters inserted
const updateProduct = async (req,res) => {
  if (!req.body.title){
    res.status(400).json({message:'title is required'});
  }

  //TODO: make it work with only specific paremeters inserted
  const product = await Productservice.updateProduct(req.params.id,req.body.title);
  if (!product){
    return res.status(404).json({errors:['Product not found']});
  }
  res.json(product);
};


const deleteProduct = async (req,res) => {
  const product = await Productservice.deleteProduct(req.params.id);
  if (!product){
    return res.status(404).json({errors:['Product not found']});
  }
  res.send();
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}