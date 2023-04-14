const mongoose = require('mongoose');
const Review = require('./review');

const recipeSchema = new mongoose.Schema({
    recipeId: { type: String, required: true },
    reviews: [Review.schema]
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;