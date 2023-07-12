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


const getProductsByCategory = async(req,res) =>{
  // console.log("controller activated")
  const searchedCategory1 = req.params["searchedCategory1"]
  let searchedCategory2 = "paramnotrecived"
  let searchedCategory3 = "paramnotrecived"
  if ("searchedCategory2" in req.params)
     searchedCategory2 = req.params["searchedCategory2"]
  if ("searchedCategory3" in req.params)
     searchedCategory3 = req.params["searchedCategory3"]
  // console.log("recieved categories:" ,searchedCategory1, searchedCategory2,searchedCategory3)
  const products = await Productservice.getProductsByCategory(searchedCategory1, searchedCategory2,searchedCategory3);
  if (!products){
    return res.status(404).json({errors:['No products are found in this category']});
  }
  res.json(products);
}

const getProductsByBrand = async(req,res) =>{
const products = await Productservice.getProductsByBrand(req.params.brand);
if (!products){
  return res.status(404).json({errors:['No products are found in this brand']});
}
res.json(products);
}


const getProductsByPrice = async(req,res) =>{
  const {minprice,maxprice} = req.params
  console.log(minprice,maxprice)
  
  const products = await Productservice.getProductsByPrice(minprice,maxprice);
  if (!products){
    return res.status(404).json({errors:['No products are found in this price range']});
  }
  res.json(products);
  }

  const groupProductsByCategory = async(req,res) =>{
    //console.log("groupBy controller activated")
    const products = await Productservice.groupProductsByCategory(req.params.category);
    if(!products){
      return res.status(404).json({errors:['No products are found in this category']});
    }
    res.json(products);
  }

  const groupProductsByBrand = async(req,res) =>{
    //console.log("groupBy controller activated")
    const products = await Productservice.groupProductsByBrand(req.params.brand);
    if(!products){
      return res.status(404).json({errors:['No products are found in this brand']});
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
    deleteProduct,
    groupProductsByCategory,
    groupProductsByBrand
}