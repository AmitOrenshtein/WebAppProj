const Productservice = require('../services/product')

const createProduct = async (req,res) => {
  const {name,image, video, brand, descrpition, category, amountInInventory,supplier, price}  = req.body
  const newProduct = await Productservice.createProduct(name,image,video,brand,descrpition,category,amountInInventory,supplier, price);
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


const getProductsByCategory = async(res,req) =>{
  const products = await Productservice.getProductsByCategory(req.params.category);
  if (!products){
    return res.status(404).json({errors:['No products are found in this category']});
  }
  res.json(products);
}

const getProductsByBrand = async(res,req) =>{
const products = await Productservice.getProductsByBrand(req.params.brand);
if (!products){
  return res.status(404).json({errors:['No products are found in this brand']});
}
res.json(products);
}


const getProductsByPrice = async(res,req) =>{
  const products = await Productservice.getProductsByPrice(req.params.price);
  if (!products){
    return res.status(404).json({errors:['No products are found in this price range']});
  }
  res.json(products);
  }

const updateProduct = async (req,res) => {
   //TODO: make it work with only specific paremeters inserted
  const {name,image, video, brand, descrpition, category, amountInInventory,supplier,price}  = req.body
  const product = await Productservice.updateProduct(req.params.id, name, image, video, brand, descrpition, category, amountInInventory, supplier,price);
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
    getProductsByCategory,
    getProductsByPrice,
    getProductsByBrand,
    updateProduct,
    deleteProduct
}