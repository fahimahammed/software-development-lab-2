const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    cost: {
        type : Number,
        required: true 
    }
})

module.exports = mongoose.model('promo', promoSchema);