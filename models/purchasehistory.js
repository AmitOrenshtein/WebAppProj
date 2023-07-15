 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../models/product')


const purchaseHistory = new Schema({
    //ID is generated by Mongo Automatically
    userID: {
        type: String,
        
    },
    purchaseDate :{
        type: Date,
    },
    productList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product'
        }
    ]
    }
    );

module.exports = mongoose.model('purchasehistory',purchaseHistory)