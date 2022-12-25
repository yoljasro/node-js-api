const { Schema, model } = require('mongoose');

const productInfoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }   
})

module.exports = model('ProductInfo', productInfoSchema);   