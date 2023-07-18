 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Branch = new Schema({
    
    name: {
        type: String,
        required: [true, "name is required"],
    },
    lat: {
        type: Number,
        required: [true, "lat is required"],
    },
    lng: {
        type: Number,
        required: [true, "lng is required"],
    }
});

module.exports = mongoose.model('branch',Branch)