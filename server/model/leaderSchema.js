const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    designation : {
        type : String,
        required: true 
    },
    age : {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('leader', leaderSchema);