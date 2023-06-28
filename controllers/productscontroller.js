const Productservice = require('../services/productsservice')

const moment = require('moment');
const Chart = require('chart.js');

const createProduct = async (req,res) => {
  const newProduct = await Productservice.createProduct(req.body.name,image,video,descrpition,category,amountInInventory,supplier);
  res.json(newProduct)
}

  
const getProducts = async (req,res) => {
  const Products = await Productservice.getProducts();
  res.json(Products);
}

const getMonthlyPurchaseData = async (req, res) => {
  try {
    const purchases = await Productservice.getProducts(); // Modify this line to retrieve the purchase records from the database

   
    const monthlyData = purchases.reduce((acc, purchase) => {
      const month = moment(purchase.date).format('MMMM YYYY'); // Modify the 'date' field based on the data structure
      if (!acc[month]) {
        acc[month] = { total: 0, count: 0 };
      }
      acc[month].total += purchase.amount; // Modify the 'amount' field based on the data structure
      acc[month].count += 1;
      return acc;
    }, {});

    const monthlyAverage = Object.entries(monthlyData).map(([month, { total, count }]) => ({
      month,
      average: total / count,
    }));

    res.json(monthlyAverage);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving monthly purchase data.' });
  }
};

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
    deleteProduct,
    getMonthlyPurchaseData
}