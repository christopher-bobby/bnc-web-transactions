const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    history: {
        required: false,
        type: String
    },
    ingredients: {
        required: true,
        type: Array
    },
    steps: {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('RecipeData', dataSchema)