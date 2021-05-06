const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    user: {
        type: String
    },
    descriptors: [{
        type: String  
    }],
    images:[{
        type: String
    }]
})

module.exports = new mongoose.model('imageRepository', imageSchema)