const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    images: {
        required: true,
        type: Array
    },
    title: {
        required: true,
        type: String
    },
    totalLikes: {
        required: false,
        type: Number
    }
}, {collection: 'menu'})

module.exports = mongoose.model('MenuData', menuSchema)