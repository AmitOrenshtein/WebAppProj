 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Branch = new Schema({
    
    name: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lng: {
        type: Number,
    }
});

module.exports = mongoose.model('branch',Branch)